// ======================
// Login function
// ======================
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('message');

    if (!email || !password) {
        messageEl.textContent = 'Please enter email and password.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            messageEl.style.color = '#00e676';
            messageEl.textContent = 'Login successful! Redirecting...';

            localStorage.setItem('userSession', JSON.stringify(data.session));

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            messageEl.style.color = '#ff6f61';
            messageEl.textContent = data.error || 'Login failed';
        }
    } catch (err) {
        messageEl.style.color = '#ff6f61';
        messageEl.textContent = 'Server error: ' + err.message;
    }
}

// ======================
// Logout function (can be used in dashboard)
// ======================
function logout() {
    localStorage.removeItem('userSession');
    window.location.href = 'login.html';
}

// ======================
// Utility: Get logged-in user session
// ======================
function getUserSession() {
    return JSON.parse(localStorage.getItem('userSession'));
}

// ======================
// Register function
// ======================
async function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('message');

    if (!name || !email || !password) {
        messageEl.textContent = 'Please fill in all fields.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            messageEl.style.color = '#00e676';
            messageEl.textContent = 'Registration successful! Redirecting to login...';

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            messageEl.style.color = '#ff6f61';
            messageEl.textContent = data.error || 'Registration failed';
        }
    } catch (err) {
        messageEl.style.color = '#ff6f61';
        messageEl.textContent = 'Server error: ' + err.message;
    }
}
//=====================
//DASHBOARD FUNCTION 
//=======================

// Greeting
document.getElementById("greeting").innerText = "Hi, John 👋";

// Simulate Upload
function uploadFile() {
  document.getElementById("upload-section").classList.add("hidden");
  document.getElementById("results-section").classList.remove("hidden");
  renderCharts();
}

function useSampleData() {
  uploadFile(); // same for demo
}

// Render Charts
function renderCharts() {
  // Salary Breakdown
  new Chart(document.getElementById("salaryChart"), {
    type: "pie",
    data: {
      labels: ["Gross", "Deductions", "Net"],
      datasets: [{ data: [5000, 1500, 3500], backgroundColor: ["#4caf50", "#f44336", "#2196f3"] }]
    }
  });

  // Expenses
  new Chart(document.getElementById("expenseChart"), {
    type: "bar",
    data: {
      labels: ["Needs", "Wants", "Savings"],
      datasets: [{ data: [2000, 3000, 500], backgroundColor: ["#2196f3", "#ff9800", "#4caf50"] }]
    }
  });

  // Cashflow
  new Chart(document.getElementById("cashflowChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr"],
      datasets: [
        { label: "Income", data: [4000, 4200, 4100, 4300], borderColor: "green", fill: false },
        { label: "Expenses", data: [3500, 3900, 4000, 4500], borderColor: "red", fill: false }
      ]
    }
  });

  // Debt Monitor
  new Chart(document.getElementById("debtChart"), {
    type: "doughnut",
    data: {
      labels: ["Debt", "Remaining"],
      datasets: [{ data: [40, 60], backgroundColor: ["#f44336", "#e0e0e0"] }]
    }
  });
}

// Chatbot
function sendMessage() {
  let input = document.getElementById("chatInput").value;
  if (!input) return;
  let chatHistory = document.getElementById("chatHistory");

  let userMsg = document.createElement("p");
  userMsg.textContent = "You: " + input;
  chatHistory.appendChild(userMsg);

  let botMsg = document.createElement("p");
  botMsg.textContent = "Bot: (AI will answer this later)";
  chatHistory.appendChild(botMsg);

  document.getElementById("chatInput").value = "";
}

//==============================
//advice page
//==============================

// Forecast Chart
function renderForecast() {
  if (!document.getElementById("forecastChart")) return;

  new Chart(document.getElementById("forecastChart"), {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        { label: "Predicted Income", data: [4200, 4300, 4400, 4450, 4500], borderColor: "green", fill: false },
        { label: "Predicted Expenses", data: [3900, 4000, 4100, 4200, 4250], borderColor: "red", fill: false }
      ]
    }
  });
}

// Simple "What If" Q&A
function askWhatIf() {
  let input = document.getElementById("whatIfInput").value;
  let response = document.getElementById("whatIfResponse");

  if (!input) return;

  let reply = "";
  if (input.includes("save")) {
    reply = "If you save R500 more each month, you’ll reach your goal 3 months earlier.";
  } else if (input.includes("spend")) {
    reply = "If you spend R1000 less on Wants, your savings rate will rise to 25%.";
  } else {
    reply = "Good question! Soon this will use AI to calculate real scenarios.";
  }

  response.innerHTML = `<p><strong>You asked:</strong> ${input}</p><p><strong>Advice:</strong> ${reply}</p>`;
}

// Run forecast chart if on advice page
renderForecast();

// =============================
// Goal Tracker Functions
// =============================
let goals = []; // For now, demo-only. Later, connect to backend DB.

function renderGoals() {
  let list = document.getElementById("goalList");
  if (!list) return;

  list.innerHTML = "";
  goals.forEach((goal, idx) => {
    let progress = (goal.currentAmount / goal.targetAmount) * 100;
    if (progress > 100) progress = 100;

    list.innerHTML += `
      <li>
        <div>
          <strong>${goal.name}</strong>  
          <p>Target: R${goal.targetAmount} | Deadline: ${goal.deadline}</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${progress}%"></div>
          </div>
          <p>Progress: R${goal.currentAmount} (${progress.toFixed(1)}%)</p>
        </div>
        <button onclick="addProgress(${idx})">+ Add R500</button>
      </li>
    `;
  });
}

function addProgress(index) {
  goals[index].currentAmount += 500; // Demo increment
  renderGoals();
}

function setupGoalForm() {
  let form = document.getElementById("goalForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let goal = {
      name: document.getElementById("goalName").value,
      targetAmount: parseFloat(document.getElementById("targetAmount").value),
      currentAmount: 0,
      deadline: document.getElementById("goalDeadline").value
    };
    goals.push(goal);
    form.reset();
    renderGoals();
  });
}

// Initialize goals page
setupGoalForm();
renderGoals();

// =============================
// Gamification state
// =============================
let streak = 0;
let xp = 0;
let level = "Beginner";

// Load saved progress from localStorage
window.onload = function () {
  if (localStorage.getItem("streak")) {
    streak = parseInt(localStorage.getItem("streak"));
    document.getElementById("streak").innerText = streak;
  }

  if (localStorage.getItem("xp")) {
    xp = parseInt(localStorage.getItem("xp"));
    updateProgress();
  }
};

// Mark a challenge complete
function completeChallenge(points) {
  xp += points;
  localStorage.setItem("xp", xp);
  updateProgress();

  alert("Challenge completed! +" + points + " XP");

  // Unlock badges
  if (xp >= 50) unlockBadge("badge1");
  if (streak >= 7) unlockBadge("badge2");
}

// Unlock badges visually
function unlockBadge(badgeId) {
  const badge = document.getElementById(badgeId);
  if (badge) {
    badge.classList.remove("locked");
    badge.classList.add("unlocked");
  }
}

// Update progress bar & level
function updateProgress() {
  let progress = document.getElementById("progress");
  progress.style.width = Math.min((xp / 100) * 100, 100) + "%";

  if (xp >= 200) level = "Intermediate";
  if (xp >= 500) level = "Ninja";

  document.getElementById("level").innerText = level;
}

// Example streak tracker
function addStreak() {
  streak++;
  localStorage.setItem("streak", streak);
  document.getElementById("streak").innerText = streak;
}
 
//==================================
//  HISTORY PAGE FUNCTIONS 
//==================================

// Load history from localStorage
function loadHistory() {
  const timeline = document.getElementById("timeline");
  const oldGoals = document.getElementById("oldGoals");

  if (!timeline) return; // only run on history.html

  let history = JSON.parse(localStorage.getItem("history")) || [];
  let goals = JSON.parse(localStorage.getItem("goals")) || [];

  // Timeline rendering
  timeline.innerHTML = "";
  history.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.date}: ${item.action} - ${item.amount || ""}`;
    timeline.appendChild(li);
  });

  // Old goals
  oldGoals.innerHTML = "";
  goals.forEach(goal => {
    let li = document.createElement("li");
    li.textContent = `${goal.dateSet}: Goal → ${goal.description}`;
    oldGoals.appendChild(li);
  });
}

// Add history entry
function addHistory(action, amount = "") {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push({ date: new Date().toLocaleDateString(), action, amount });
  localStorage.setItem("history", JSON.stringify(history));
}

// Export CSV
function exportCSV() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let csvContent = "data:text/csv;charset=utf-8,Date,Action,Amount\n";

  history.forEach(row => {
    csvContent += `${row.date},${row.action},${row.amount}\n`;
  });

  let link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "history.csv");
  link.click();
}

// Export PDF (simple approach using print dialog)
function exportPDF() {
  window.print();
}

// Call loadHistory when on history.html
window.onload = function () {
  if (document.getElementById("timeline")) {
    loadHistory();
  }
};
