// Simulated user data
const users = [
  {
    username: "user1",
    email: "user1@example.com",
    password: "password1",
    shear: 10000,
    savings: 2000000,
    totalBalance: 100000000,
  },
  {
    username: "user2",
    email: "user2@example.com",
    password: "password2",
    shear: 15000,
    savings: 2500000,
    totalBalance: 120000000,
  },
  // Add more users as needed
];

document.addEventListener("DOMContentLoaded", function () {
  // Get the login form elements
  const submitButton = document.getElementById("submitbutton");
  const usernameOrEmailInput = document.getElementById("usernameOrEmail");
  const passwordInput = document.getElementById("password");

  // Add click event listener to the login button
  submitButton.addEventListener("click", function () {
    const usernameOrEmail = usernameOrEmailInput.value;
    const password = passwordInput.value;

    // Simple validation
    const user = users.find(
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
    );

    if (user) {
      // Redirect to the dashboard with the correct file name
      window.location.href = `dashboard.html?username=${user.username}`;
    } else {
      alert("Invalid username or password");
    }
  });

  // Get the username from the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  // Find the user by username
  const user = users.find((u) => u.username === username);

  if (user) {
    // Update dashboard content with user information
    document.getElementById("displayName").textContent = user.username;
    document.getElementById("shearAmount").textContent = user.shear;
    document.getElementById("savingsAmount").textContent = user.savings;
    document.getElementById("totalBalance").textContent = user.totalBalance;
  } else {
    // Redirect to the login page if the user is not found
    window.location.href = "#";
  }
});
