import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";

let URL = "http://localhost:8080/api/members"

export async function initSignup() {

    document.querySelector("#btn-signup").addEventListener("click", signup)

}

async function signup() {
    event.preventDefault()

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
        const response = await fetch(URL, options).then(handleHttpErrors)
        
    } catch(e) {
        document.querySelector("#error").innerText = e.message
    }



}