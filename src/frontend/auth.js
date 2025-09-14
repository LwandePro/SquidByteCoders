// login.html
async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
}

// register.html
async function registerUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // Add to users table
    await supabase.from("users").insert([{ user_id: data.user.id, full_name: name }]);
    alert("Registration successful!");
    window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
}
