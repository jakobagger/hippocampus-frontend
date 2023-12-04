import {API_URL} from "../../settings.js"
const URL = API_URL + "/matrix"
import { sanitizeStringWithTableRows } from "../../utils.js"


export async function initAddMatrix()  {
  console.log("helloooo")
  document.querySelector("#add-matrix-btn").addEventListener("click", addMatrix);
}

async function addMatrix() {
  const form = document.querySelector("#matrix-form")
  
  const newMatrix = {
    name: form.name.value
  }

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newMatrix),
  };
  try {
    const matrix = await fetch(URL, options).then((res) => {
      if (!res.ok) {
        throw new Error("Matrix not added");
      }
      return res.json();
    });
    
  } catch (e) {
    document.getElementById("error").innerText = e.message;
  }
}