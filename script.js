document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Optional: Toggle icon
    if (document.body.classList.contains("dark-mode")) {
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌗";
    }
  });

  // Your existing code (form, admin login, etc.) can stay below this block
});

// Handle Contact Form Submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const time = new Date().toLocaleString();

  const newResponse = {
    name,
    email,
    message,
    time
  };

  let responses = JSON.parse(localStorage.getItem("responses")) || [];
  responses.push(newResponse);
  localStorage.setItem("responses", JSON.stringify(responses));

  // Show confirmation message
const msg = document.getElementById("confirmation-message");
msg.classList.remove("hidden");
msg.classList.add("show");

// Hide after 3 seconds
setTimeout(() => {
  msg.classList.remove("show");
  msg.classList.add("hidden");
}, 3000);

  contactForm.reset();
});

// Admin Login
function loginAdmin() {
  const password = document.getElementById("adminPass").value;
  if (password === "admin123") {
    document.getElementById("admin").style.display = "none";
    document.getElementById("responses").style.display = "block";
    showResponses();
  } else {
    alert("Incorrect Password!");
  }
}

// Logout Admin
function logoutAdmin() {
  document.getElementById("responses").style.display = "none";
  document.getElementById("admin").style.display = "block";
}

// Show Responses
function showResponses() {
  const container = document.getElementById("responseContainer");
  const responses = JSON.parse(localStorage.getItem("responses")) || [];
  container.innerHTML = "";

  if (responses.length === 0) {
    container.innerHTML = "<p>No responses yet.</p>";
    return;
  }

  responses.forEach(res => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${res.name}</strong> (${res.email})<br/>
      <em>${res.time}</em><br/>
      <p>${res.message}</p>
      <hr/>
    `;
    container.appendChild(div);
  });
}
