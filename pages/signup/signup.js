import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
import { API_URL } from "../../settings.js";


export async function initSignup() {
    
    document.querySelector("#btn-signup").addEventListener("click", signup)

}

async function signup(event) {
    event.preventDefault()
    const responseStatus = document.getElementById("response")

    const form = document.querySelector("#form-signup")

    const username = form.username.value
    const email = form.email.value
    const password = form.password.value

    const newMember = {
        username: username,
        email: email,
        password: password
    }

    console.log(newMember.username)

    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newMember)
    };

    try {
        const response = await fetch(API_URL+"/members", options).then(res => handleHttpErrors(res));
        const jsonData = await response.json();
        console.log("Received data:", jsonData);
        responseStatus.innerText = JSON.stringify(jsonData);
    } catch (e) {
        console.error("Error occurred:", e);
        if (e.fullResponse) {
            // Display a custom message based on the error response
            responseStatus.innerText = `Error: ${e.fullResponse.error}. Status: ${e.fullResponse.status}.`;
        } else {
            // Fallback error message
            responseStatus.innerText = e.message;
        }
    }

}