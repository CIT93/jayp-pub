/*
    We declare these variables in the global scope so that we can use them
    in multiple functions without having to pass them back and forth a lot.

    We initialize them to 0 to avoid calculation errors, but that means the
    total that the user sees will be inaccurate (too low) until all the
    questions are answered, which is reasonable.
*/

let cfHousehold = 0;    // points for household size
let cfHomeSize = 0;     // points for physical house size

//----
//  This function updates the element with the ID "cfTotalField" with the current
//  running total for Carbon Footprint based on the global variables, above.
//
//  Nothing new here except that it is a function that is used in a way that many
//  functions are used: It is called from different places to perform a common task.
//  In this case, we call it every time we want to update the total CF value because
//  the user answered or made a change to a question.
//
function displayTotalCF(){
    const cfTotalField = document.getElementById("cfTotalField");   // get the output element by its ID
    let totalCF = cfHousehold + cfHomeSize;     // we have only the two values so far, but we'll add more later!
    cfTotalField.textContent = totalCF;         // set the element on the web page
}

//----
//  This fuction is called from the "household" text box control, using its
//  "oninput=" attribute. This means the function is called immediately after
//  the user makes any change, including every keystroke, which is kinda
//  awesome. It makes the web page feel more "responsive", which is a pretty
//  big deal in web development.
//
//  The function simply uses the nested if-else statements we just learned to
//  set the global variable "cfHousehold" properly based upon whatever the user
//  has typed into the text field.
//
//  Then we call our displayTotalCF() function above.
//
function determineHouseholdPts(inputText){
    numberInHousehold = parseInt(inputText);
    if(numberInHousehold === 1){            // user lives alone
        cfHousehold = 14;
    } else if(numberInHousehold === 2){     // user lives with 1 other person
        cfHousehold = 12;
    } else if(numberInHousehold === 3){     // user lives with 2 other people
        cfHousehold = 10;
    } else if(numberInHousehold === 4){     // user lives with 3 other people
        cfHousehold = 8;
    } else if(numberInHousehold === 5){     // user lives with 4 other people
        cfHousehold = 6;
    } else if(numberInHousehold === 6){     // user lives with 5 other people
        cfHousehold = 4;
    } else if(numberInHousehold > 6){       // user lives with more thawn 5 other people
        cfHousehold = 2;
    } else{
            // The user typed in a zero, negative number, something not numeric,
            // or just erased the field. We just set the calculated value to zero
            // until a valid number is given, and output the invalid value to the
            // console in case we need to debug it.
            cfHousehold = 0;
            console.log(`Invalid number of people in household given: ${inputText}`);
    }
    displayTotalCF();   // call our other function to update the field showing the total
}

//----
//  This function is called from the fieldset with the House Size radio buttons.
//  Again, it uses the "oninput=" attribute to make it be called immediately every
//  time the user selects or changes a radio button, making our web page feel very
//  "responsive". Rah!
//
//  The function simply uses document.querySelector() with a CSS selector to find
//  the selected radio button and then retrieve its value attribute. It then sets
//  the "cfHomeSize" global variable to that value (after making it into an int).
//
//  Then we call our displayTotalCF() function above.
//
function determineHouseSizePts(){
    cfHomeSize = parseInt(document.querySelector('input[name="housesize"]:checked').value);     // find value for house size
    displayTotalCF();   // call our other function to update the field showing the total
}
