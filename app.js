// UI variables

const loanForm = document.querySelector("#loan-form");
const loanAmount = document.querySelector("#amount");
const interestRate = document.querySelector("#interest");
const yearsRepay = document.querySelector("#years");
const monthlyPayment = document.querySelector("#monthly-payment");
const totalPayment = document.querySelector("#total-payment");
const totalInterest = document.querySelector("#total-interest");
const loading = document.querySelector("#loading");
const results = document.querySelector("#results");

// Load all event listeners
loadEventListeners();

// Load all event listeners function
function loadEventListeners() {
  // Calculate event
  loanForm.addEventListener("submit", calculate);
}

function calculate(e) {
  results.style.display = 'none';
  loading.style.display = 'none';
  
  // parseFloat converts to a decimal
  const principalAmount = parseFloat(loanAmount.value);
  const calcInterest = parseFloat(interestRate.value / 100 / 12);
  const calcPayments = parseFloat(yearsRepay.value * 12);
  
  const x = Math.pow(1 + calcInterest, calcPayments);
  const monthly = (principalAmount * x * calcInterest) / (x - 1);
  if (isFinite(monthly)) {
    loadingStart();
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcPayments).toFixed(2);
    totalInterest.value = (monthly * calcPayments - principalAmount).toFixed(2);
    setTimeout(loadingStop, 2000);
    
  } else {
    showError("Please check you have entered your numbers correctly?");
  }
  
  e.preventDefault();
}

function loadingStart() {
  results.style.display = 'none';
  loading.style.display = 'block';
}

function loadingStop() {
  results.style.display = 'block';
  loading.style.display = 'none';
}

function showError(error) {
  
  const errorDiv = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));
  
  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  
  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
