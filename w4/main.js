//----
//  To minimize global scope clutter, we'll use a single object identifier
//  and place all category points into that object. This places only one
//  identifier on the global scope instead of one per category, but still
//  allows us to easily access all categories from different functions
//  without passing this object back and forth everywhere.
//
const cfCategory = {    // this is the only identifier in the global scope
    cfHousehold:    0,  // points for household size
    cfHomeSize:     0,  // points for physical house size
}

const cfpData = [];

//----
//  This function updates the element with the ID "cfTotalField" with the current
//  running total for Carbon Footprint based on the global variables, above.
//
function displayTotalCF(){
    const cfTotalField = document.getElementById("cfTotalField");   // get the output element by its ID
    let totalCF = cfCategory.cfHousehold + cfCategory.cfHomeSize;   // we have only the two values so far, but we'll add more later!
    cfTotalField.textContent = totalCF;         // set the element on the web page
}

//----
//  This fuction is now called from updateHouseholdPts() to show assignment
//  comprehension of function return values. Instead of setting the value in
//  our cfCategory object, we simply return the value so that the calling
//  function can use it.
//
function determineHouseholdPts(inputText){
    numberInHousehold = parseInt(inputText);
    if(numberInHousehold === 1){            // user lives alone
        return 14;
    } else if(numberInHousehold === 2){     // user lives with 1 other person
        return 12;
    } else if(numberInHousehold === 3){     // user lives with 2 other people
        return 10;
    } else if(numberInHousehold === 4){     // user lives with 3 other people
        return 8;
    } else if(numberInHousehold === 5){     // user lives with 4 other people
        return 6;
    } else if(numberInHousehold === 6){     // user lives with 5 other people
        return 4;
    } else if(numberInHousehold > 6){       // user lives with more thawn 5 other people
        return 2;
    }
    console.log(`Invalid number of people in household given: ${inputText}`);
    return 0;
}

//----
//  Our app is currently event-driven, so we can't exactly use the solutions given in
//  the assignment videos. In order to still show comprehension of function return
//  values, we'll separate the calculation and assignment operations.
//
function updateHouseholdPts(inputText){
    cfCategory.cfHousehold = determineHouseholdPts(inputText);
    displayTotalCF();   // update the field showing the total
}

//----
//  This function is now called from updateHouseSizePts() to show assignment
//  comprehension of fuctional return values. Instead of setting the value in
//  our cfCategory object, we simply return the value so that the calling
//  function can use it.
//
//  We retrofit it for use in the assignments by using a default parameter.
//  If no parameter is passed, then we are calling this function from the HTML
//  and thus check the checkbox. Otherwise, we use the passed value.
//
function determineHouseSizePts(val = null){
    if(val){
        if(val === "large"){
            return 10;
        }else if(val === "medium"){
            return 7;
        }else if(val === "small"){
            return 4;
        }else if(val === "apartment"){
            return 2;
        }
        return 0;   // invalid size, return zero
    }
    return parseInt(document.querySelector('input[name="housesize"]:checked').value);     // find value for house size
}

//----
//  Again, we'll separate the value determination and assignment into two separate
//  functions to show comprehension of function return values for the assignment.
//  The original code was pretty compact already and so it wasn't really
//  necessary, but it's not bad, and we gotta do our homework. :)
//
function updateHouseSizePts(){
    cfCategory.cfHomeSize = determineHouseSizePts();
    displayTotalCF();   // update the field showing the total
}

function start( householdMembers, houseSize ){
    const houseHoldPts = determineHouseholdPts(householdMembers);
    const houseSizePts = determineHouseSizePts(houseSize);
    const total = houseHoldPts + houseSizePts;

    cfpData.push([householdMembers, houseSize, houseHoldPts, houseSizePts, total]);
}

function displayOutput(){
    for(arr of cfpData){
        console.log(arr);
        const output = document.getElementById("output");

        // create a new paragraph
        //
        // I don't know if there's a better way to enclose a bolded element within a
        // paragraph element, but here's how to do it with what we know so far.
        //
        const newP = document.createElement("p");
        const newB = document.createElement("b");
        newB.textContent = `Carbon Footprint total is ${arr[4]}`;
        newP.appendChild(newB);

        // create a line item for household members beneath the paragraph
        const newLIHouseholdMembers = document.createElement("li");
        newLIHouseholdMembers.textContent = `${arr[2]} for having ${arr[0]} household members.`;
        newP.appendChild(newLIHouseholdMembers);

        // create a line item for house size beneath the paragraph
        const newLIHouseSize = document.createElement("li");
        newLIHouseSize.textContent = `${arr[3]} for having a ${arr[1]} home.`;
        newP.appendChild(newLIHouseSize);

        output.appendChild(newP);
    }
}

start(5, "apartment");
start(4, "large");
start(3, "medium");

displayOutput();
