import { API_URL } from "../../settings.js";

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
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const data = await response.json();
        loginResult.textContent = "Login successful";
    } else {
        const errorData = await response.json();
        loginError.textContent = "Failed to login: " + errorData.message;
    }
    } catch (err) {
    loginError.textContent = "Error: " + err.message;
    }
};