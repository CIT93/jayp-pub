// We will use footprint.js for the Footprint class instead of making another
// new file because it makes the most sense, because the two functions become
// methods of the class.

// Forced update. Already added 2nd method in previous commit.

class Footprint {
    constructor(first, last, members, size, fchoice, ftype) {
        this.firstName = first;         // store initial values to class
        this.lastName = last;
        this.householdMembers = members;
        this.houseSize = size;
        this.foodChoice = fchoice;
        this.foodType = ftype;
        this.determineHouseholdPts();   // determine calculated values
        this.determineHouseSizePts();
        this.determineFoodChoicePts();
        this.determineFoodTypePts();
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

    // determine points for food choices
    determineFoodChoicePts() {
        if(this.foodChoice === "domestic-meat-daily"){
            this.foodChoicePts = 10;
        }else if(this.foodChoice === "domestic-meat-weekly"){
            this.foodChoicePts = 8;
        }else if(this.foodChoice === "vegetarian"){
            this.foodChoicePts = 4;
        }else if(this.foodChoice === "vegan"){
            this.foodChoicePts = 2;
        }else{
            // invalid input, but we set a value anyway to avoid any errors
            // when attempting to use the value
            this.foodChoicePts = 0;
        }
    }

    // determine points for food type
    determineFoodTypePts() {
        if(this.foodType === "prepackaged"){
            this.foodTypePts = 12;
        }else if(this.foodType === "balanced"){
            this.foodTypePts = 6;
        }else if(this.foodType === "fresh"){
            this.foodTypePts = 2;
        }else{
            // invalid input, but we set a value anyway to avoid any errors
            // when attempting to use the value
            this.foodTypePts = 0;
        }
    }

    // calculate the total footprint
    calcFPTotal() {
        this.total = this.houseHoldPts + this.houseSizePts + this.foodChoicePts + this.foodTypePts;
    }
};

export { Footprint };
