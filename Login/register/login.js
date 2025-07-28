// login.js
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );
  
    if (matchedUser) {
      alert("🎉 Login successful!");
      // Redirect to homepage or dashboard
      window.location.href = "../Home/home.html"; // Update this path if needed
    } else {
      alert("⚠️ Invalid username or password.");
    }
  });
  