import React from "react";

import ReactDOM from "react-dom";

import { Permutation } from "js-combinatorics";

import _, { zip, last } from "underscore";

function permApply(elementObjects, permutations) {
  console.log("function starting");
  /* paramterObjects to Arrays  */
  const elementNamesArray = elementObjects.map((a) => a.Element);
  const elementMassArray = elementObjects.map((a) => a.Mass);

  /* permutations  */
  const allPermutations = new Permutation(
    permutations,
    elementNamesArray.length
  );

  /*  storage */
  const resultContainer = [];

  /* loop
  allPermutations array contains all chunked permutations [[1,2,3], [3,2,1]...]
    
  */

  for (const chunkPermutation of allPermutations) {
    let sum = 0;

    let counter = 0;

    const equasions = [];

    for (const [singlePermutation, elementMass, elementName] of _.zip(
      chunkPermutation,
      elementMassArray,
      elementNamesArray
    )) {
      
    

      counter++;
       // BUG War counter unten  

      /* -----caculation-part---start--------------------------------------------------------------------*/

      let result =
        Math.round(
          (singlePermutation + Number.EPSILON) * (elementMass + Number.EPSILON)
        ) / 100;

      sum += result;
       /* -----caculation-part---end--------------------------------------------------------------------*/
       
       
        let equasionString =  singlePermutation + " * " + elementMass + " " + elementName;

        if (counter < chunkPermutation.length) {
        
          // BUG War use of concat 
          equasionString += " + "  
          equasions.push(equasionString)
        
        } else if (counter === chunkPermutation.length) {
          equasionString += " = "
          equasions.push(equasionString)

    
          const joinedEquasionString = equasions.join (" ")
          
          const joinedEquasionArray = [joinedEquasionString]
          // daraus ein array machen 

          joinedEquasionArray.push([sum])

          resultContainer.push(joinedEquasionArray);
        }

    }
  }
  console.log(resultContainer[0]);
  return resultContainer;
}

function performanceTest() {
  console.time();

  permApply(
    [
      { Element: "Fe", Mass: 55.935 },

      { Element: "OA", Mass: 281.248 },
      { Element: "LA", Mass: 279.233 },

      { Element: "LA", Mass: 271.233 },
      { Element: "LA", Mass: 272.233 },
      { Element: "LA", Mass: 274.233 },
      { Element: "LA", Mass: 270.233 },
    ],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  );

  console.timeEnd();
}

export default function App() {
  return (
    <div>
      <button onClick={() => performanceTest()}>click me</button>
      <p></p>
    </div>
  );
}
