let URL = "http://localhost:8080/api"

export async function initLogin() {
    document.getElementById("login-form").addEventListener("submit", login);
}

async function login() {
    event.preventDefault();
    
    const loginResult = document.getElementById("login-result");
    const loginError = document.getElementById("login-error"); 

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const payload = {
    username,
    password
    };

    try {
    const response = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        storeLoginDetails(data);
        loginResult.textContent = "Login successful";
        updateNavbar();
        window.location.href = "/";
    } else {
        const errorData = await response.json();
        loginError.textContent = "Failed to login: " + errorData.message;
    }
    } catch (err) {
    loginError.textContent = "Error: " + err.message;
    }
};

function storeLoginDetails(response) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("username", response.username);
    localStorage.setItem("roles", response.roles);
    
    // TODO: add UI update (toggle) function

    console.log("Login fisk");
    console.log(response.token);
    console.log(response.username);
    console.log(response.roles);
    console.log(localStorage.getItem("token"));
}

document.addEventListener("DOMContentLoaded", function() {
    updateNavbar();
});

function updateNavbar() {
    const username = localStorage.getItem("username");
    const navbarList = document.getElementById("login-menu");

    if (username) {
        navbarList.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                    data-bs-toggle="dropdown" aria-expanded="false">
                    ${username}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                </ul>
            </li>`;
    } else {
        navbarList.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="/login" data-navigo>Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/signup" data-navigo>Signup</a>
            </li>`;
    }
}