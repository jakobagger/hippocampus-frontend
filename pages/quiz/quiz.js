import { API_URL } from "../../settings.js";

let cardDataArray = []; // Defines cardDataArray at the top level of the module
let unchangedArray = []
let correctGuesses = [];
let incorrectGuesses = [];
let isCardRevealed = false;
let currentIndex = 0;
let startTime;
let time;

export async function initQuiz(){


    console.log("QUIZ! QUIZ! QUIZ!");

    // Call inital fetchCardData to fetch first record and render quiz data
    fetchCardData();

    // Add event listener to the 'Next' button
    document.getElementById('next-card-btn').addEventListener('click', fetchRandomCardData);
    document.getElementById("show-card-btn").addEventListener("click", function() {isCardRevealed=true})
    document.getElementById("play-again-btn").addEventListener("click", resetCardArrays)
    document.getElementById("save-score-btn").addEventListener("click", saveScore)
    


}

async function fetchCardData() {

    try {
        const response = await fetch(`${API_URL}/card`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        cardDataArray = await response.json(); // Store response in global array
        unchangedArray = cardDataArray.slice();

        if (cardDataArray.length > 0) {
            populateCardData(cardDataArray[0]); // First record
        } else {
            console.log('No records found in the response');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
    startTime = Date.now();
    // showTimer();
}

function fetchRandomCardData() {
    filterCorrectIncorrect()   
    let endTime = Date.now();
    let time = (endTime-startTime)/1000;
    document.getElementById("timer-badge").innerText = time
    if(cardDataArray.length ===1) {
        document.getElementById("next-card-btn").innerText = "Finish";
    }

    if (cardDataArray && cardDataArray.length > 0) {
        console.log(cardDataArray.length)
        const randomIndex = Math.floor(Math.random() * cardDataArray.length);
        populateCardData(cardDataArray[randomIndex]); // Using global array
        currentIndex = randomIndex;
        console.log("current " + currentIndex + "  random " + randomIndex)

    } else {
        showScore(time)
        toggleDisplayStyle("next-card-btn");
        toggleDisplayStyle("play-again-btn");
        toggleDisplayStyle("save-score-btn")

    }        

    console.log("Correct: " + correctGuesses.length)
    console.log("incorrect: " + incorrectGuesses.length)
 
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

function toggleDisplayStyle(btn) {
    var btn = document.getElementById(btn);
    if(btn.style.display ==="none") {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }

}

function resetCardArrays() {
    cardDataArray = unchangedArray.slice();
    correctGuesses.length = 0;
    incorrectGuesses.length = 0;
    toggleDisplayStyle("next-card-btn");
    toggleDisplayStyle("play-again-btn");
    fetchCardData();
    document.getElementById("next-card-btn").innerText = "Next";
    toggleDisplayStyle("score-badge")
    document.getElementById("timer-badge").innerText = "Timer"
}

function showScore(time) {
    toggleDisplayStyle("score-badge")
    document.getElementById("timer-badge").innerText = time;
    document.getElementById("score-badge").innerText = "Score: "+correctGuesses.length + " out of " + unchangedArray.length;

}

async function saveScore() {

    const username = window.localStorage.getItem("username")
    const quiz_id = 1
    let time = document.getElementById("timer-badge").innerText
    let scoreNumber = document.getElementById("score-badge").innerText
    const payload = {
        username,
        quiz_id,
        time,
        scoreNumber
        };
    
        try {
        const response = await fetch(`${API_URL}/score`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }) 
        if (response.ok) {
            console.log("save succesful")
        }
        } catch (err) {
            console.log(err)
        }
}



// function showTimer() {
//     let date = new Date()
//     let min = date.getMinutes();
//     let sec = date.getSeconds();
//     let mil = date.getMilliseconds();

//     min = (min < 10) ? "0" + min : min;
//     sec = (sec < 10) ? "0" + sec : sec;

//     let time = min + ":" + sec + ":" + (mil/100)
//     document.getElementById("clock-btn").innerText = time;
//     var updateTime = setTimeout(function() {showTimer()}, 199)
//     console.log(time)
    
// }
