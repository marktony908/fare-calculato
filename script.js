// Show registration form
function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

// Show login form
function showLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// Register new user (stored in localStorage)
function register() {
    let username = document.getElementById("registerUsername").value;
    let password = document.getElementById("registerPassword").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    if (localStorage.getItem(username)) {
        alert("User already exists!");
        return;
    }

    localStorage.setItem(username, password);
    alert("Registration successful! Please login.");
    showLogin();
}

// Login user (checks localStorage)
function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    if (localStorage.getItem(username) === password) {
        alert("Login successful!");
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("fareCalculator").style.display = "block";
    } else {
        alert("Invalid username or password.");
    }
}

// Fare Calculation
function calculateFare() {
    let distance = document.getElementById("distance").value;
    let rate = document.getElementById("rate").value;
    let total = distance * rate;
    document.getElementById("totalFare").textContent = total;
}

// Logout
function logout() {
    document.getElementById("fareCalculator").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}
