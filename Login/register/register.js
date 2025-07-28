// register.js
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const fullname = document.getElementById("fullname").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const gender = document.getElementById("gender").value;
  
    if (fullname.length < 3) {
      alert("❌ Full name must be at least 3 characters.");
      return;
    }
    if (username.length < 3) {
      alert("❌ Username must be at least 3 characters.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("❌ Please enter a valid email.");
      return;
    }
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match.");
      return;
    }
    if (!gender) {
      alert("❌ Please select your gender.");
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const userExists = users.some(user => user.username === username);
  
    if (userExists) {
      alert("⚠️ Username already exists. Try a different one.");
      return;
    }
  
    users.push({ fullname, username, email, password, gender });
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("🎉 Registration successful! Redirecting to login...");
    window.location.href = "../Login/login.html";
  });