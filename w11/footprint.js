// We will use footprint.js for the Footprint class instead of making another
// new file because it makes the most sense, because the two functions become
// methods of the class.

// Forced update. Already added 2nd method in previous commit.

class Footprint {
    constructor(first, last, members, size) {
        this.firstName = first;
        this.lastName = last;
        this.householdMembers = members;
        this.houseSize = size;
        this.determineHouseholdPts();
        this.determineHouseSizePts();
        this.calcFPTotal();
    }

    // determine points for household members
    determineHouseholdPts() {
        const numberInHousehold = parseInt(this.householdMembers);
        if(numberInHousehold === 1){            // user lives alone
            this.houseHoldPts = 14;
        } else if(numberInHousehold === 2){     // user lives with 1 other person
            this.houseHoldPts = 12;
        } else if(numberInHousehold === 3){     // user lives with 2 other people
            this.houseHoldPts = 10;
        } else if(numberInHousehold === 4){     // user lives with 3 other people
            this.houseHoldPts = 8;
        } else if(numberInHousehold === 5){     // user lives with 4 other people
            this.houseHoldPts = 6;
        } else if(numberInHousehold === 6){     // user lives with 5 other people
            this.houseHoldPts = 4;
        } else if(numberInHousehold > 6){       // user lives with more thawn 5 other people
            this.houseHoldPts = 2;
        } else {
            // invalid input, but we set a value anyway to avoid any errors
            // when attempting to use the value, but we still output an
            // error message to the console
            this.houseHoldPts = 0;
            console.log(`Invalid number of people in household given: ${inputText}`);
        }
    }

    // determine points for physical house size
    determineHouseSizePts() {
        if(this.houseSize){
            if(this.houseSize === "large"){
                this.houseSizePts = 10;
            }else if(this.houseSize === "medium"){
                this.houseSizePts = 7;
            }else if(this.houseSize === "small"){
                this.houseSizePts = 4;
            }else if(this.houseSize === "apartment"){
                this.houseSizePts = 2;
            }
        } else {
            // invalid input, but we set a value anyway to avoid any errors
            // when attempting to use the value
            this.houseSizePts = 0;
        }
    }

    // calculate the total footprint
    calcFPTotal() {
        this.total = this.houseHoldPts + this.houseSizePts;
    }
};

// retaining the old functions and exports, since the assignment didn't say
// we could switch to using the class methods yet

const determineHouseholdPts = (inputText) => {
    const numberInHousehold = parseInt(inputText);
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

const determineHouseSizePts = (val = null) => {
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

export { Footprint, determineHouseSizePts, determineHouseholdPts };
