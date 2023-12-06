import {API_URL} from "../../settings.js"
const URL = API_URL + "/matrix/default"

import { sanitizeStringWithTableRows } from "../../utils.js"

export async function initDefaultMatrix(){
  
  getMatrixData();

}


async function getMatrixData(){
  try {
    const matrixFromServer = await fetch(URL).then(res => res.json())
    const matrixCards = matrixFromServer.cards
    console.log(matrixCards)
    renderMatrixData(matrixCards)
    
  } catch (e){
    console.log("Errot fetching matrix " + e)
  }
}


function renderMatrixData(data) {
    data.forEach(card => {
      let selector = `.grid-item[data-value="${card.value}"][data-suit="${card.suit}"]`
      let cell = document.querySelector(selector)
      // Populate person
      let personDiv = cell.querySelector('.card-person');
      personDiv.textContent = card.person;

      // Set image
      let img = cell.querySelector('.card-image');
      img.src = card.image;
      img.alt = `${card.person} - ${card.action} - ${card.object}`;

      // Populate action
      let actionDiv = cell.querySelector('.card-action');
      actionDiv.textContent = card.action;

      // Populate object
      let objectDiv = cell.querySelector('.card-object');
      objectDiv.textContent = card.object;
    });

}
