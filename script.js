document.addEventListener("DOMContentLoaded", function () {
    const loginContainer = document.getElementById("login-container");
    const registerContainer = document.getElementById("register");
    const fareCalculator = document.getElementById("fare-calculator");
    const confirmationMessage = document.getElementById("confirmation-message");
    const videoContainer = document.getElementById("video-container");
    const videoElement = document.getElementById("promo-video");

    // Load users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};

    document.getElementById("register-btn").addEventListener("click", function () {
        registerContainer.style.display = "block";
        loginContainer.style.display = "none";
    });

    document.getElementById("login-btn").addEventListener("click", function () {
        loginContainer.style.display = "block";
        registerContainer.style.display = "none";
    });

    document.getElementById("submit-register").addEventListener("click", function () {
        const registerUsername = document.getElementById("register-username").value.trim();
        const registerPassword = document.getElementById("register-password").value.trim();

        if (registerUsername && registerPassword) {
            if (users[registerUsername]) {
                alert("Username already exists. Try logging in.");
            } else {
                users[registerUsername] = registerPassword;
                localStorage.setItem("users", JSON.stringify(users));
                alert("Registration successful! Please log in.");
                registerContainer.style.display = "none";
                loginContainer.style.display = "block";
            }
        } else {
            alert("Please fill in all fields.");
        }
    });

    document.getElementById("submit-login").addEventListener("click", function () {
        const loginUsername = document.getElementById("login-username").value.trim();
        const loginPassword = document.getElementById("login-password").value.trim();

        if (users[loginUsername] && users[loginUsername] === loginPassword) {
            alert("Login successful!");
            loginContainer.style.display = "none";
            fareCalculator.style.display = "block";
            videoContainer.style.display = "block";
            videoElement.src += "&autoplay=true"; // Play video after login
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });

    const routePrices = {
        "Embakasi-Kikuyu": 190,
        "Embakasi-Westlands": 150,
        "CBD-Kikuyu": 100,
        "CBD-Westlands": 80,
        "Thika-Ruiru": 120,
        "Thika-CBD": 200,
        "Kikuyu-Ngong": 180,
        "Westlands-Ruiru": 140
    };

    // Add reverse routes
    Object.keys(routePrices).forEach(route => {
        const [from, to] = route.split("-");
        routePrices[`${to}-${from}`] = routePrices[route];
    });

    document.getElementById("calculate-fare").addEventListener("click", function () {
        const pickup = document.getElementById("pickup").value;
        const destination = document.getElementById("destination").value;
        const passengers = parseInt(document.getElementById("passengers").value, 10);
        const routeKey = `${pickup}-${destination}`;

        if (routePrices[routeKey]) {
            const totalFare = routePrices[routeKey] * passengers;
            document.getElementById("total-fare").innerText = `Total Fare: KES ${totalFare}`;
        } else {
            document.getElementById("total-fare").innerText = "Invalid route selected";
        }
    });

    document.getElementById("book-now").addEventListener("click", function () {
        confirmationMessage.style.display = "block";
        confirmationMessage.innerHTML = `
            <p>Your booking has been confirmed! Thank you for choosing our service.</p>
            <p>To complete your payment, send KES <strong id="pay-amount"></strong> to <strong>M-Pesa: 0745694981</strong></p>
        `;
        const totalFareText = document.getElementById("total-fare").innerText;
        const fareMatch = totalFareText.match(/\d+/);
        if (fareMatch) {
            document.getElementById("pay-amount").innerText = fareMatch[0];
        }
    });
});
