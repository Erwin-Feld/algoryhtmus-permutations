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
    //  TODO Change Name 
    const stringContainer = [];

    /*loops over each item of the chunkPermutation [1,2,3] --> 1...2...3
                                  elementMassArray [50.44, 66.33..] ---> 50.44 ...66.33
                                  elementNamesArray [Iron, Sulfit] ---> Iron..Sulfit...
            get  single value of each 
    */  
    for (const [singlePermutation, elementMass, elementName] of _.zip(chunkPermutation, elementMassArray, elementNamesArray)) {



     
      /*------- String-Part-start-------------------------------------*/
      
       /* makes string of each values like 3 * 50.66 - Iron   */
         //  TODO Change Name 
         
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
    
      
        stringContainer.push(singleCompString);
        // console.log(stringArray)
      } else if (counter <= chunkPermutation.length) {
        stringContainer.push(singleCompString);
      }


       /* String Part  finish-----*-----------*------------*---------*/
      // TEST  Result wird mit 3 nachkommastellen gemacht
      let result = (singlePermutation * elementMass);
     
      // TODO EINFÜGEN DAS SINGLEPERM * MASS NUR 3 NACHKOMMASTELLEN HAT  
      // RESULT Geht iwi net dauert noch länger es muss die Computation mutiplication verändert werden das ergebnis nur 3 nachkommstellen haben kann
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
  // TEST Schleife Weg 

  /*
   RESULT// Schleife dauert 5 Sekunden !!!
  */
  

  // for (const elementArray of resultContainer) {
  //   // console.log(elementArray)
  //   console.log(_.last(elementArray))
   
  // //  for (const zahl of elementArray) {
  // //    console.log(zahl)
  // //   //  if (zahl >= 966 && zahl <= 964) {
  // //   //    console.log(elementArray)

  // //   //  } else {
  // //   //    console.log("no range")
  // //   //  }
  // //  }
   
  // } 
 
  // TEST ENDE



  return resultContainer;

  //TODO string part
  //  add x , elementName , +
}


function performanceTest(){
  console.time();

  permApply([
    // Correct
    // { Element: "Eisen", Mass: 55.935 },
    // { Element: "Ölsäure", Mass: 281.248 },
    // { Element: "Sauerstoff", Mass: 15.995 },


    { Element: "Fe", Mass: 55.935 },

    { Element: "OA", Mass: 281.248 },
    { Element: "LA", Mass: 279.233 },
   
  ],
  [0,1, 2,3,4,5,6,7,8,9,10]

  )


  console.timeEnd();


}



export default function App() {
  return (

    <div>
      <button onClick={()=> performanceTest()}>click me</button>
    <p> 

    </p>
    </div>
  );
}







