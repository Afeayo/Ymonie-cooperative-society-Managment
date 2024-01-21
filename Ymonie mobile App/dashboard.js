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
    {
      username: "AfeAyoSunday",
      email: "user3@example.com",
      password: "password3",
      shear: 10000000,
      savings: 2500000,
      totalBalance: 120000000,
    },
    {
      username: "Afeayo Favour",
      email: "user4@example.com",
      password: "afeayo",
      shear: 20000000,
      savings: 2500000,
      totalBalance: 130000000,
    },
    // Add more users as needed
  ];
  
  document.addEventListener("DOMContentLoaded", function () {
    // Get the username from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
  
    // Find the user by username
    const user = users.find((u) => u.username === username);
  
    if (user) {
      // Update dashboard content with user information
      document.getElementById("displayNameSpan").textContent = user.username;
      document.getElementById("shearAmountSpan").textContent = user.shear;
      document.getElementById("savingsAmountSpan").textContent = user.savings;
      document.getElementById("totalBalanceSpan").textContent = user.totalBalance;
    } else {
      // Redirect to the login page if the user is not found
      window.location.href = "#";
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem("user");
  
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
  
      // Update the dashboard with user information
      document.getElementById("displayNameSpan").textContent = user.username;
      document.getElementById("shearAmountSpan").textContent = `₦${user.shear.toLocaleString()}`;
      document.getElementById("savingsAmountSpan").textContent = `₦${user.savings.toLocaleString()}`;
      document.getElementById("totalBalanceSpan").textContent = `₦${user.totalBalance.toLocaleString()}`;
  
      // Clear the stored user data from localStorage
      localStorage.removeItem("user");
    }
  });
  