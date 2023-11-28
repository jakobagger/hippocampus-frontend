import {API_URL} from "../../settings.js"
const URL = API_URL + "/matrix"
const URLvalue = API_URL + "/matrix/value" 
const URLsuit = API_URL + "/matrix/suit"

import { sanitizeStringWithTableRows } from "../../utils.js"

export async function initDefaultMatrix(){
  console.log("got you")
  getAndRenderMatrix();
}


async function getAndRenderMatrix(){
  try {
    const matrixFromServer = await fetch(URL).then(res => res.json())
    renderMatrixData(matrixFromServer)
    console.log("got it")
  } catch (e){
    console.log("Errot fetching matrix " + e)
  }
}

// async function getAndRenderValue(){
//   try {
//     const matrixFromServer = await fetch(URLvalue).then(res => res.json())
//     renderMatrixData(matrixFromServer)
//     console.log("got lost")
//   } catch (e){
//     console.log("Errot fetching matrix " + e)
//   }
// }


function renderMatrixData(data) {
  let headers = '<th></th>';
  let idsRow = '<td></td>';
  let numbersRow = '<td></td>';
  let descriptionsRow = '<td></td>';

  // Assuming all matrices have the same structure and number of values
  if (data.length > 0) {
    // Create headers and rows for each value in the first matrix
    data[0].values.forEach((value, index) => {
      headers += `<th>Value ${index + 1}</th>`;
      idsRow += `<td>${value.valueId}</td>`;
      numbersRow += `<td>${value.valueNumber}</td>`;
      descriptionsRow += `<td>${value.valueDescription}</td>`;
    });
  }

  // Wrap headers and rows in respective table row tags
  let tableHeaders = `<tr>${headers}</tr>`;
  let tableIdsRow = `<tr>${idsRow}</tr>`;
  let tableNumbersRow = `<tr>${numbersRow}</tr>`;
  let tableDescriptionsRow = `<tr>${descriptionsRow}</tr>`;

  // Combine all rows and set them as innerHTML of the table body
  document.querySelector("#matrix-tbl-body").innerHTML = sanitizeStringWithTableRows(tableHeaders + tableIdsRow + tableNumbersRow + tableDescriptionsRow);
}





