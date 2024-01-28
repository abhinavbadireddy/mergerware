const registerForm = document.getElementById('register');
const dashboard = document.getElementById('dashboard');
const loanRequest = document.getElementById('loan-request');
const loanPayment = document.getElementById('loan-payment');
const transactions = document.getElementById('transactions');

// Function to register user
function registerUser(email, role) {
    localStorage.setItem('user', JSON.stringify({ email, role }));
}

// Function to show dashboard
function showDashboard() {
    registerForm.style.display = 'none';
    dashboard.style.display = 'block';
}

// Function to show loan request content
function showLoanRequest() {
    // Implement loan request logic here
    // For example, display a button for borrowers to request a loan
    loanRequest.innerHTML = '<button onclick="requestLoan()">Request Loan</button>';
}

// Function to show loan payment content
function showLoanPayment() {
    // Implement loan payment logic here
    // For example, display a button for lenders to confirm a loan payment
    loanPayment.innerHTML = '<button onclick="confirmPayment()">Confirm Payment</button>';
}

// Function to show transactions content
function showTransactions() {
    // Implement transactions logic here
    // For example, display a list of transactions for admin users
    transactions.innerHTML = '<h3>Transactions</h3><ul id="transaction-list"></ul>';
}

// Event listener for register form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registerForm['email'].value;
    const role = registerForm['role'].value;
    registerUser(email, role);
    showDashboard();
    if (role === 'borrower') {
        showLoanRequest();
    } else if (role === 'lender') {
        showLoanPayment();
    } else if (role === 'admin') {
        showTransactions();
    }
});

// Example functions for loan request, payment confirmation, and transactions
function requestLoan() {
    // Implement loan request logic here
    // For example, add a new loan request to the transaction list
    const transactionList = document.getElementById('transaction-list');
    const newTransaction = document.createElement('li');
    newTransaction.textContent = 'Borrower requested a loan';
    transactionList.appendChild(newTransaction);
}

function confirmPayment() {
    // Implement loan payment confirmation logic here
    // For example, mark a loan as paid in the transaction list
    const transactionList = document.getElementById('transaction-list');
    const transactions = transactionList.getElementsByTagName('li');
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].textContent.includes('Loan paid')) {
            transactions[i].textContent = 'Loan paid by lender';
            break;
        }
    }
}

// Function to initialize the app
function init() {
    // Check if user is already registered
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        showDashboard();
        if (user.role === 'borrower') {
            showLoanRequest();
        } else if (user.role === 'lender') {
            showLoanPayment();
        } else if (user.role === 'admin') {
            showTransactions();
        }
    }
}

init();