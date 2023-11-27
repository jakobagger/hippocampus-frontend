import { API_URL } from "../../settings.js";

let cardDataArray = []; // Defines cardDataArray at the top level of the module
let unchainedArray = []
let correctGuesses = [];
let incorrectGuesses = [];
let isCardRevealed = false;
let currentIndex = 0;
let startTime;

export async function initQuiz(){


    console.log("QUIZ! QUIZ! QUIZ!");

    // Call inital fetchCardData to fetch first record and render quiz data
    fetchCardData();

    // Add event listener to the 'Next' button
    document.getElementById('next-card-btn').addEventListener('click', fetchRandomCardData);
    document.getElementById("show-card-btn").addEventListener("click", function() {isCardRevealed=true})

}

async function fetchCardData() {

    startTime = Date.now();
    try {
        const response = await fetch(`${API_URL}/card`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        cardDataArray = await response.json(); // Store response in global array
        unchainedArray = cardDataArray;

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
    console.log(isCardRevealed)
    filterCorrectIncorrect()

    if (cardDataArray && cardDataArray.length > 0) {
        console.log(cardDataArray.length)
        const randomIndex = Math.floor(Math.random() * cardDataArray.length);
        populateCardData(cardDataArray[randomIndex]); // Using global array
        currentIndex = randomIndex;
        console.log("current " + currentIndex + "  random " + randomIndex)
        console.log("Correct: " + correctGuesses.length)
        console.log("incorrect: " + incorrectGuesses.length)
    } else {
        console.log('No cards available to display');

    }
        let endTime = Date.now();
        let time = endTime-startTime;
        console.log(time/100)
        isCardRevealed = false;
}

function populateCardData(card) {
    document.getElementById('name').value = card.person || '';
    document.getElementById('action').value = card.action || '';
    document.getElementById('object').value = card.object || '';
    document.getElementById('card').value = card.value + " of " + card.suit || '';
    document.getElementById('current-card-image').src = card.image || '';
}

function filterCorrectIncorrect() {
    if(isCardRevealed==true) {
        incorrectGuesses.push(cardDataArray[currentIndex])
        cardDataArray.splice(currentIndex, 1)
    }
    else {
        correctGuesses.push(cardDataArray[currentIndex])
        cardDataArray.splice(currentIndex, 1)
    }
}
