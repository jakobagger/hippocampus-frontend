import {API_URL} from "../../settings.js"
const URL_MATRIX = API_URL + "/matrix"
const URL_SUITS = API_URL + "/suit"
const URL_VALUE = API_URL + "/value"



export async function initAddMatrix()  {
  console.log("helloooo")
  document.querySelector("#add-matrix-btn").addEventListener("click", function (event){
    event.preventDefault();
    combinedAdds();
    console.log("this is the end")
    
  })
 
}

async function combinedAdds(){
  const matrixId = await addMatrix();
  await addSuits(matrixId);
  await addValues(matrixId);
  console.log("Do you send christmas packages")
 window.router.navigate("userMatrix")
}

async function addMatrix() {
  const form = document.querySelector("#matrix-form")
  console.log("addMatrix")
  const newMatrix = {
    matrixName: form.name.value
  }

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newMatrix),
  };
  try {
    const response = await fetch(URL_MATRIX, options);
      if (!response.ok) {
        throw new Error("Matrix not added");
      }
      
      const matrixData = await response.json();

      // Retrieve the matrixId from the response
      const matrixId = matrixData.matrixId;
  
      return matrixId;

          
  } catch (e) {
    document.getElementById("error").innerText = e.message;
  }

  
}

async function addSuits(matrixId) {
  const form = document.querySelector("#matrix-form")
  console.log("add suit")
  const suitData = [
  {
    suitName: form.nameH.value,
    suitDescription: form.descriptionH.value,
    matrixId: matrixId
  },
  {
    suitName: form.nameS.value,
    suitDescription: form.descriptionS.value,
    matrixId: matrixId
  },
  {
    suitName: form.nameD.value,
    suitDescription: form.descriptionD.value,
    matrixId: matrixId
  },
  {
    suitName: form.nameC.value,
    suitDescription: form.descriptionC.value,
    matrixId: matrixId
  }
];
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(suitData),
  };
  try {
    const response = await fetch(URL_SUITS, options);
      if (!response.ok) {
        throw new Error("Suits not added");
      }
      return response.json();
    
  } catch (e) {
    document.getElementById("error").innerText = e.message;
  }
}

  async function addValues(matrixId) {
    const form = document.querySelector("#matrix-form")
    console.log("add values")
    const valueData =[
      {
        valueName: form.Ace.value,
        valueDescription: form.descriptionAce.value,
        matrixId: matrixId
      },
      {
        valueName: form.two.value,
        valueDescription: form.descriptionTwo.value,
        matrixId: matrixId
      },
      {
        valueName: form.three.value,
        valueDescription: form.descriptionThree.value,
        matrixId: matrixId
      },
      {
        valueName: form.four.value,
        valueDescription: form.descriptionFour.value,
        matrixId: matrixId
      },
      {
        valueName: form.five.value,
        valueDescription: form.descriptionFive.value,
        matrixId: matrixId
      },
      {
        valueName: form.six.value,
        valueDescription: form.descriptionSix.value,
        matrixId: matrixId
      },
      {
        valueName: form.seven.value,
        valueDescription: form.descriptionSeven.value,
        matrixId: matrixId
      },
      {
        valueName: form.eight.value,
        valueDescription: form.descriptionEight.value,
        matrixId: matrixId
      },
      {
        valueName: form.nine.value,
        valueDescription: form.descriptionNine.value,
        matrixId: matrixId
      },
      {
        valueName: form.ten.value,
        valueDescription: form.descriptionTen.value,
        matrixId: matrixId
      },
      {
        valueName: form.jack.value,
        valueDescription: form.descriptionJack.value,
        matrixId: matrixId
      },
      {
        valueName: form.queen.value,
        valueDescription: form.descriptionQueen.value,
        matrixId: matrixId
      },
      {
        valueName: form.king.value,
        valueDescription: form.descriptionKing.value,
        matrixId: matrixId
      }

    ];

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(valueData),
    };
    try {
      const response = await fetch(URL_VALUE, options);
        if (!response.ok) {
          throw new Error("Values not added");
        }
        return response.json();
      
    } catch (e) {
      document.getElementById("error").innerText = e.message;
    }
  }

