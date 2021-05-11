import React from "react";

import ReactDOM from "react-dom";

import { Permutation } from "js-combinatorics";

import _, { zip, last, values } from "underscore";
                    // data           max perm     solutin       deviation +/- to solution 
function permApply(elementObjects, permutations, solution, maxDeviation ) {
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

      let result = singlePermutation * elementMass
      // WIESO das untere hat ein Scheiß gemacht diggah 
        // Math.round(
        //   (singlePermutation + Number.EPSILON) * (elementMass + Number.EPSILON)
        // ) / 100;

      sum += result;
      /* -----caculation-part---end--------------------------------------------------------------------*/

      let equasionString =
        singlePermutation + " * " + elementMass + " " + elementName;

      if (counter < chunkPermutation.length) {
        // BUG War use of concat
        equasionString += " + ";
        equasions.push(equasionString);
      } else if (counter === chunkPermutation.length) {

        if (sum >= (solution - maxDeviation) && sum <= (solution + maxDeviation)) {
          // Abweichungswert +/- Max ist 5 
        
          // TEST Range Check
          // 
          //  if sum <= result -3 // between
          equasionString += " = ";
          equasions.push(equasionString);

          const joinedEquasionString = equasions.join(" ");

          const joinedEquasionArray = [joinedEquasionString];
          // daraus ein array machen

          joinedEquasionArray.push([sum]);

          resultContainer.push(joinedEquasionArray);
        }
      }
    }
  }

  
  // compares to get the closes result to the solution
  function compare(a, b) {
 
    const aAbs = Math.abs(a[1] - solution);
    const bAbs = Math.abs(b[1] - solution);
    return aAbs - bAbs;
  }

  // sort compares two elements and sort them to array with everything is okay 
  resultContainer.sort(compare)



  console.log(resultContainer)

  // for (let values of resultContainer) {
  //   for (let single of values) {
  //     console.log(single);
  //   }
  // }

  return resultContainer;
}

function performanceTest() {
  console.time();

  permApply(
    [
      { Element: "Fe", Mass: 55.935 },

      { Element: "OA", Mass: 281.248 },
      { Element: "O", Mass: 15.995 },
    ],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    955.6,
    5
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
