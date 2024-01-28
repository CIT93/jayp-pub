//  Code for HTML form removed for clarity.

//----
//  We will continue to use the identifier cfpData but it will now be an object
//  created within start(). To continue processing an entire array of data instead
//  of just one data set at a time, we'll make a new global cfpDataList to store
//  the list of all objects.
//
cfpDataList = [];

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
    }
    return 0;   // invalid size, return zero
}

//----
//  Refactored to store the provided and calculated data using an object.
//  All the identifiers are still the same to minimize changed code.
//  The object properties share the same names to minimize confusion.
//
//  Note that while the video kinda suggests we should now process only one data set
//  at a time, this would make the app lose functionality. We will instead process
//  the data set as an object, but then push that object into an array of objects.
//  UPDATE: Yep, the video solution shows processing of only one data set at a time.
//
//  We'll also consolidate (most of) the assignments because we can. Except for the
//  total, which we must calculate after the other properties have been assigned.
//
function start( householdMembers, houseSize ){
    const cfpData = {
        householdMembers:   householdMembers,
        houseSize:          houseSize,
        houseHoldPts:       determineHouseholdPts(householdMembers),
        houseSizePts:       determineHouseSizePts(houseSize),
            //  We use a method to calculate the total so that it can be calculated
            //  after the other values have been assigned. Using:
            //
            //      total:  this.houseHoldPts + this.houseSizePts,
            //
            //  FAILS because the function calls are not yet performed until the
            //  object is fully instantiated, unlike setting values from variables
            //  or constants.
            //
            //  We initialize the total to undefined so that attempting to use it
            //  prior to calculation results in an error instead of bad data.
        total:              undefined,
        calcTotal: function(){
            this.total = this.houseHoldPts + this.houseSizePts;
        }
    };
    cfpData.calcTotal();    // calculate the totals after the object is instantiated

    cfpDataList.push(cfpData);  // push the object to the array
}

//----
//  We now process cfpDataList as an array of objects instead of an array of arrays.
//
function displayOutput(){
    const output = document.getElementById("output");

    for(data of cfpDataList){
        // create a new paragraph
        //
        // I don't know if there's a better way to enclose a bolded element within a
        // paragraph element, but here's how to do it with what we know so far.
        //
        const newP = document.createElement("p");
        const newB = document.createElement("b");
        newB.textContent = `Carbon Footprint total is ${data.total}`;
        newP.appendChild(newB);

        // create a line item for household members beneath the paragraph
        const newLIHouseholdMembers = document.createElement("li");
        newLIHouseholdMembers.textContent = `${data.houseHoldPts} for having ${data.householdMembers} household members.`;
        newP.appendChild(newLIHouseholdMembers);

        // create a line item for house size beneath the paragraph
        const newLIHouseSize = document.createElement("li");
        newLIHouseSize.textContent = `${data.houseSizePts} for having a ${data.houseSize} home.`;
        newP.appendChild(newLIHouseSize);

        output.appendChild(newP);
    }
}

start(5, "apartment");
start(4, "large");
start(3, "medium");

displayOutput();

//  Refactor the start function to store the data in an object instead of an array.

//  Intro to Objects

const myArr = [];
const myObj = {
    cfpTotal: 18,
    houseSize: "small",
    displayOut: function (){
        console.log("this is a method call");
        console.log(this.houseSize);
        // console.log(myObj.cfpTotal);
    }
};
console.log(myObj);
console.log(myObj.cfpTotal);
console.log(myObj.houseSize);
myObj.displayOut();

// loop working code removed for clarity
