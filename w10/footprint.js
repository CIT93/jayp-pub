const determineHouseholdPts = function(inputText){
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

const determineHouseSizePts = function(val = null){
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

export {determineHouseSizePts, determineHouseholdPts};
