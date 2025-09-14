
// Supabase Initialization
const SUPABASE_URL = "https://xajqbqajezrstwvzavdt.supabase.co"
const SUPABASE_KEY = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhanFicWFqZXpyc3R3dnphdmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NTcxMjEsImV4cCI6MjA3MzMzMzEyMX0.XBydTZUBV_yX2iLz954ubmMeZzyDvwDNHQ-MT8MyTZU";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ----------------------------
// User Authentication
const user = supabase.auth.getUser().then(({ data }) => {
  if (!data.user) window.location.href = "login.html";
  document.getElementById("userName").textContent = data.user.email.split("@")[0];
  loadDashboard(data.user.id);
});

// ----------------------------
// Load Gamification, Timeline, Chat
async function loadDashboard(userId) {
  await loadGamification(userId);
  await loadTimeline(userId);
  await loadChat(userId);
}

// ----------------------------
// Gamification
async function loadGamification(userId) {
  const { data, error } = await supabase
    .from("gamification")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (data) {
    const points = data.points || 0;
    const progressPercent = Math.min(points, 100);
    document.getElementById("pointsText").textContent = `Points: ${points}`;
    document.getElementById("progressFill").style.width = progressPercent + "%";
    document.getElementById("badgesText").textContent = data.badges ? data.badges.join(", ") : "None";
  }
}

// ----------------------------
// Timeline / History
async function loadTimeline(userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const timelineEl = document.getElementById("timeline");
  timelineEl.innerHTML = data.map(item => 
    `<li>${new Date(item.created_at).toLocaleDateString()} - ${item.transaction_type || "Activity"}</li>`
  ).join("");
}

// ----------------------------
// Chatbot
async function loadChat(userId) {
  const { data, error } = await supabase
    .from("chat_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  const chatEl = document.getElementById("chatContent");
  chatEl.innerHTML = data.map(msg => 
    `<div class="chat-message ${msg.role === "user" ? "user-message" : "bot-message"}">
      ${msg.message}
    </div>`).join("");
  chatEl.scrollTop = chatEl.scrollHeight;
}

async function sendMessage() {
  const msgInput = document.getElementById("chatInput");
  const message = msgInput.value;
  if (!message) return;

  // Send to Supabase
  const { data, error } = await supabase
    .from("chat_history")
    .insert([{ user_id: user.id, message, role: "user" }]);

  // Fake bot response (can be replaced with your AI endpoint)
  await supabase.from("chat_history").insert([{ user_id: user.id, message: "ZuluBot says: " + message, role: "bot" }]);

  msgInput.value = "";
  loadChat(user.id);
}

// Logout
function logout() {
  supabase.auth.signOut().then(() => window.location.href = "login.html");
}

// File Upload
document.getElementById("fileInput").addEventListener("change", uploadFile);

async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  if (!fileInput.files.length) return alert("Select a file first.");

  const file = fileInput.files[0];
  const fileName = `${user.id}/${Date.now()}_${file.name}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from("user-files")
    .upload(fileName, file);

  if (error) {
    document.getElementById("uploadStatus").textContent = "Upload failed: " + error.message;
  } else {
    document.getElementById("uploadStatus").textContent = "Upload successful!";
    // Insert record into documents table
    await supabase.from("documents").insert([{ user_id: user.id, file_path: fileName }]);
    // Optional: increase points for gamification
    await incrementPoints(user.id, 10);
  }
  
}

// Gamification Helpers
async function incrementPoints(userId, pointsToAdd) {
  const { data, error } = await supabase
    .from("gamification")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!data) return;

  const newPoints = (data.points || 0) + pointsToAdd;
  await supabase.from("gamification").update({ points: newPoints }).eq("user_id", userId);

  // Update progress bar with animation
  animateProgress(newPoints);
}

function animateProgress(points) {
  const fill = document.getElementById("progressFill");
  const text = document.getElementById("pointsText");
  let width = 0;
  const target = Math.min(points, 100);
  const interval = setInterval(() => {
    if (width >= target) clearInterval(interval);
    else {
      width++;
      fill.style.width = width + "%";
      text.textContent = `Points: ${points}`;
    }
  }, 10);
}

// Badges
function updateBadges(badgesArray) {
  const badgesEl = document.getElementById("badgesText");
  badgesEl.innerHTML = badgesArray.map(b => `<span class="badge">${b}</span>`).join(" ");
}

// Call this after loading gamification
async function loadGamification(userId) {
  const { data, error } = await supabase
    .from("gamification")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (data) {
    const points = data.points || 0;
    animateProgress(points);
    updateBadges(data.badges || []);
  }
}



