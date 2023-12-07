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
    const matrixSuits = matrixFromServer.suits
    const matrixValues = matrixFromServer.values
    renderMatrixValues(matrixValues)
    renderMatrixSuits(matrixSuits)
    renderMatrixData(matrixCards)
    
  } catch (e){
    console.log("Errot fetching matrix " + e)
  }
}

function renderMatrixValues(data) {
  const columnDivs = document.querySelectorAll("div[data-att]")
  data.forEach(value => {
      let valueName = value.valueName;

      columnDivs.forEach(div => {
        if(div.getAttribute("data-att").includes(valueName)) {
          div.textContent = value.valueDescription
        }
      })

      
  })

}

function renderMatrixSuits(data) {

  data.forEach(suit => {
    let suitSelector = `.end-row[data-suit="${suit.suitName}"]`
    let suitCell = document.querySelector(suitSelector)
    suitCell.textContent = suit.suitDescription
  })


}

function renderMatrixData(data) {
    data.forEach(card => {
      let cellselector = `.grid-item[data-value="${card.value}"][data-suit="${card.suit}"]`
      let cell = document.querySelector(cellselector)
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
