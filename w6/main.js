const FORM = document.getElementById("form");
const OUTPUT = document.getElementById("output");
cfpDataList = [];

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

// add a record to the data list
// TODO: we should probably stop calling this function start()
function start( firstname, lastname, householdMembers, houseSize ){
    const cfpData = {
        firstName:          firstname,
        lastName:           lastname,
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

// generate a report of the entire data list
function displayOutput(){
    for(data of cfpDataList){
        // create a new paragraph
        //
        // I don't know if there's a better way to enclose a bolded element within a
        // paragraph element, but here's how to do it with what we know so far.
        //
        const newP = document.createElement("p");
        const newB = document.createElement("b");
        newB.textContent = `Carbon Footprint total for ${data.firstName} ${data.lastName}: ${data.total}`;
        newP.appendChild(newB);

        // create a line item for household members beneath the paragraph
        const newLIHouseholdMembers = document.createElement("li");
        newLIHouseholdMembers.textContent = `${data.houseHoldPts} for having ${data.householdMembers} household members.`;
        newP.appendChild(newLIHouseholdMembers);

        // create a line item for house size beneath the paragraph
        const newLIHouseSize = document.createElement("li");
        newLIHouseSize.textContent = `${data.houseSizePts} for having a ${data.houseSize} home.`;
        newP.appendChild(newLIHouseSize);

        OUTPUT.appendChild(newP);
    }
}

FORM.addEventListener("submit", function(e){
    e.preventDefault();
    const firstName = FORM.firstname.value;
    const lastName = FORM.lastname.value;
    const houseMembers = parseInt(FORM.housemembers.value);
    const houseSize = FORM.housesize.value;

    start(firstName, lastName, houseMembers, houseSize);
    OUTPUT.innerHTML = "";
    displayOutput();
    FORM.reset();
});
