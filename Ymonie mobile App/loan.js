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
let user;
let loanRequested = false;
let guarantor1Approved = false;
let guarantor2Approved = false;

function requestLoan() {
  const enteredUsername = document.getElementById("usernameInput").value;
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);

  if (isNaN(loanAmount) || loanAmount <= 0) {
    displayError("Invalid loan amount");
    return;
  }

  user = users.find((u) => u.username === enteredUsername);

  if (!user) {
    displayError("User not found");
    return;
  }

  // Check if the loan amount is more than twice the savings
  if (loanAmount > 2 * user.savings) {
    displayError("Loan amount cannot exceed twice the savings");
    return;
  }

  console.log(`Loan request approved for ${user.username}. Amount: ${loanAmount}`);
  user.savings += loanAmount;
  user.totalBalance += loanAmount;

  const interest = loanAmount * 0.03;
  const paybackAmount = loanAmount + interest;

  document.getElementById("loanamout").textContent = `Approved Loan Amount: ₦${loanAmount.toLocaleString()}`;
  document.getElementById("payback").textContent = `To be paid back: ₦${paybackAmount.toLocaleString()}`;

  const firstGuarantor = document.getElementById("firstguarantor").value;
  const secondGuarantor = document.getElementById("secondguarantor").value;

  document.getElementById("garantor1").textContent = `${firstGuarantor}: Pending Approval`;
  document.getElementById("garantor2").textContent = `${secondGuarantor}: Pending Approval`;

  // Reset approval variables
  guarantor1Approved = false;
  guarantor2Approved = false;

  console.log(`New savings balance: ${user.savings}`);
  console.log(`New total balance: ${user.totalBalance}`);

  loanRequested = true; // Set loanRequested to true after successful request
}


function approveLoan(guarantor) {
  const firstGuarantor = document.getElementById("firstguarantor").value;
  const secondGuarantor = document.getElementById("secondguarantor").value;

  // Check if the provided guarantor is a registered user
  const isRegisteredGuarantor = users.some((u) => u.username === guarantor);

  if (!isRegisteredGuarantor) {
    displayError(`${guarantor} is not a recognized user`);
    return;
  }

  if (guarantor === firstGuarantor) {
    document.getElementById("garantor1").textContent = `${firstGuarantor}: Approved`;
    guarantor1Approved = true;
  } else if (guarantor === secondGuarantor) {
    document.getElementById("garantor2").textContent = `${secondGuarantor}: Approved`;
    guarantor2Approved = true;
  }

  if (guarantor1Approved && guarantor2Approved) {
    document.getElementById("claim").style.display = "block";
    document.getElementById("claim").disabled = false;
  }
}

function displayError(message) {
  // Display error messages in the loanamout element
  document.getElementById("loanamout").textContent = `Error: ${message}`;
  // Clear other fields
  document.getElementById("payback").textContent = "";
  document.getElementById("garantor1").textContent = "";
  document.getElementById("garantor2").textContent = "";
}

function claimLoan() {
  if (!loanRequested || !guarantor1Approved || !guarantor2Approved) {
    console.error("Loan not eligible for claiming");
    return;
  }

  console.log(`Loan claimed by ${user.username}`);

  user.savings += user.requestedLoanAmount;
  user.totalBalance += user.requestedLoanAmount;

  updateDashboard(user);
  redirectToDashboard();  // Ensure this line is present
}
function redirectToDashboard() {
  console.log("Loan claimed successfully");

  // Store user data in localStorage
  localStorage.setItem("user", JSON.stringify(user));

  // Redirect to the dashboard
  window.location.href = "dashboard.html";
}

