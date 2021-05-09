import React from "react";

import ReactDOM from "react-dom";

import { Permutation } from "js-combinatorics";

import _, { zip, last } from "underscore";



function permApply(elementObjects, permutations) {

  console.log("function starting")
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
  /*loops over each chunk of permutations */
 
    /*  */
    let sum = 0;
     /*  */
    let counter = 0;
     /*  */
    const stringContainer = [];

    /*loops over each item of the chunkPermutation [1,2,3] --> 1...2...3
                                  elementMassArray [50.44, 66.33..] ---> 50.44 ...66.33
                                  elementNamesArray [Iron, Sulfit] ---> Iron..Sulfit...
            get all single values 
    */  
    for (const [singlePermutation, elementMass, elementName] of _.zip(chunkPermutation, elementMassArray, elementNamesArray)) {



     
      /*------- String-Part-start-------------------------------------*/
      
       /* makes string of each values like 3 * 50.66 - Iron   */
      const singleCompString = singlePermutation  + " * " + elementMass + elementName;

      
      
      // TODO   Counter nicht doppelt machen sonder unten einfügen 
     
     /* string can only have so much values like elements in the chunk 
     /*  counts how many elements should be in
      counter cheks if it gets not bigger then the chunk  */
      if (counter === 0) {
      
        stringContainer.push(singleCompString);

      } else if (counter > 0 && counter <= chunkPermutation.length) {
        const plus = " + "

        singleCompString + plus
        // append x an  + inside
      
        stringContainer.push(singleCompString);
        // console.log(stringArray)
      } else if (counter <= chunkPermutation.length) {
        stringContainer.push(singleCompString);
      }


       /* String Part  finish-----*-----------*------------*---------*/

      let result = (singlePermutation * elementMass);
      // TODO EINFÜGEN DAS SINGLEPERM * MASS NUR 3 NACHKOMMASTELLEN HAT 
      // maximal 3 nachkommastellen 
      // https://stackoverflow.com/a/48635528/14809198
      sum += result;
      counter++;

      if (counter === chunkPermutation.length) {

        const concated = stringContainer.concat(sum);
        
        resultContainer.push(concated);


      
      }
    }
  }

  //  SCHLEIFE UM wERTE ANZUZEIGEN
  for (const elementArray of resultContainer) {
    // console.log(elementArray)
    console.log(_.last(elementArray))
   
  //  for (const zahl of elementArray) {
  //    console.log(zahl)
  //   //  if (zahl >= 966 && zahl <= 964) {
  //   //    console.log(elementArray)

  //   //  } else {
  //   //    console.log("no range")
  //   //  }
  //  }
   
  } 
 



  return resultContainer;

  //TODO string part
  //  add x , elementName , +
}



export default function App() {
  return (

    <div>
      <button onClick={(e)=> {permApply( [
          // Correct
          // { Element: "Eisen", Mass: 55.935 },
          // { Element: "Ölsäure", Mass: 281.248 },
          // { Element: "Sauerstoff", Mass: 15.995 },


          { Element: "Fe", Mass: 55.935 },

          { Element: "OA", Mass: 281.248 },
          { Element: "LA", Mass: 279.233 },
          // { Element: "H2O", Mass: 18.011 },
          // { Element: "O", Mass: 15.995 },
          // { Element: " CO3", Mass: 59.985 },


          // { Element: "SA", Mass: 283.264 },
          // { Element: "Na", Mass: 22.98977 },
          // { Element: "CH2", Mass: 14.016 },
          // { Element: "C", Mass: 12.000 },
          // { Element: "H", Mass: 1.008 },


        ],
        [0,1, 2,3,4,5,6,7,8,9,10]

      )}}>click me</button>
    <p> 

      {/* {permApply(
        [
          // Correct
          // { Element: "Eisen", Mass: 55.935 },
          // { Element: "Ölsäure", Mass: 281.248 },
          // { Element: "Sauerstoff", Mass: 15.995 },


           { Element: "Eisen", Mass: 55.935 },
          { Element: "Ölsäure", Mass: 281.248 },
          { Element: "Sauerstoff", Mass: 15.995 },


        ],
        [0,1, 2,3,4,5,6,7,8,9,10]
      )} */}
    </p>
    </div>
  );
}





