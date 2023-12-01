import { API_URL } from "../../settings.js";

export async function initLogin() {
    document.getElementById("login-form").addEventListener("submit", login);
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    window.location.href = "/";
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
    const response = await fetch(`${API_URL}/auth/login`, {
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

    console.log(response.token);
    console.log(response.username);
    console.log(response.roles);
    console.log(localStorage.getItem("token"));
}

document.addEventListener("DOMContentLoaded", function() {
    updateNavbar();
    attachLogoutEventListener();
});

function attachLogoutEventListener() {
    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            logout();
        });
    }
}

function updateNavbar() {
    const username = localStorage.getItem("username");
    const navbarList = document.getElementById("login-menu");
    const roles = localStorage.getItem("roles");
    // TODO: Slet de her console.log()
    console.log("Dine roller: " + roles);
    console.log("Dit username: " + username);
    console.log("Din token: " + localStorage.getItem("token"));

    if (username && roles.includes("ADMIN")) {
        navbarList.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                    data-bs-toggle="dropdown" aria-expanded="false">
                    ${username}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item nav-item" href="/admin">ADMIN</a></li>
                    <li><a class="dropdown-item nav-item" href="/profile">Profile</a></li>
                    <li><a class="dropdown-item nav-item" href="/user-settings">Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item nav-item" id="logoutLink" href="/logout">Logout</a></li>
                </ul>
            </li>`;
    } else if (username) {
        navbarList.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
                    data-bs-toggle="dropdown" aria-expanded="false">
                    ${username}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item nav-item" href="/profile">Profile</a></li>
                    <li><a class="dropdown-item nav-item" href="/user-settings">Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item nav-item" id="logoutLink" href="/logout">Logout</a></li>
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
