import { API_URL } from "../../settings.js";

let cardDataArray = []; // Defines cardDataArray at the top level of the module

export async function initQuiz(){
    console.log("QUIZ! QUIZ! QUIZ!");

    // Call inital fetchCardData to fetch first record and render quiz data
    fetchCardData();

    // Add event listener to the 'Next' button
    document.getElementById('next-card-btn').addEventListener('click', fetchRandomCardData);

    //Add event listener for keystrokes
    document.addEventListener("keydown", handleShortCuts);
}

async function fetchCardData() {
    try {
        const response = await fetch(`${API_URL}/card`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        cardDataArray = await response.json(); // Store response in global array

        if (cardDataArray.length > 0) {
            populateCardData(cardDataArray[0]); // First record
        } else {
            console.log('No records found in the response');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function fetchRandomCardData() {
    if (cardDataArray && cardDataArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * cardDataArray.length);
        populateCardData(cardDataArray[randomIndex]); // Using global array
    } else {
        console.log('No cards available to display');
    }
}

function populateCardData(card) {
    document.getElementById('name').value = card.person || '';
    document.getElementById('action').value = card.action || '';
    document.getElementById('object').value = card.object || '';
    document.getElementById('card').value = card.value + " of " + card.suit || '';
    document.getElementById('current-card-image').src = card.image || '';
}

function handleShortCuts (evt) {
    if (evt.key === "n"){
        evt.preventDefault();
        fetchRandomCardData();
    }
    if (evt.key === "s"){
        evt.preventDefault();
        //TODO SHOW CARD
    }
}


