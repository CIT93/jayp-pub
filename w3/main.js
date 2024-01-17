let carbonFootprintPts = 0;   // carbon footprint point accumulator
const numberInHousehold = 3;    // actual number in household

if(numberInHousehold === 1){            // user lives alone
    carbonFootprintPts += 14;
} else if(numberInHousehold === 2){     // user lives with 1 other person
    carbonFootprintPts += 12;
} else if(numberInHousehold === 3){     // user lives with 2 other people
    carbonFootprintPts += 10;
} else if(numberInHousehold === 4){     // user lives with 3 other people
    carbonFootprintPts += 8;
} else if(numberInHousehold === 5){     // user lives with 4 other people
    carbonFootprintPts += 6;
} else if(numberInHousehold === 6){     // user lives with 5 other people
    carbonFootprintPts += 4;
} else if(numberInHousehold > 6){       // user lives with more thawn 5 other people
    carbonFootprintPts += 2;
} else{
    console.log("Invalid negative number of people in household!");
}
console.log(`The running total for Carbon Footprint points is ${carbonFootprintPts}`);
