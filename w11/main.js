import { renderTbl } from "./render.js";
import { Footprint, determineHouseSizePts, determineHouseholdPts } from "./footprint.js";
import { FORM, FNAME, LNAME, HMEMBERS, HSIZE, cfpDataList, setCFPData } from "./global.js";
import { localSave, localLoad } from "./storage.js";
import { validateFieldInput } from "./validate.js";

// add a record to the data list
const addCFRecord = ( firstname, lastname, householdMembers, houseSize ) => {
    const cfpData = {
        firstName:          firstname,
        lastName:           lastname,
        householdMembers:   householdMembers,
        houseSize:          houseSize,
        houseHoldPts:       determineHouseholdPts(householdMembers),
        houseSizePts:       determineHouseSizePts(houseSize),
        total:              undefined,
        calcTotal: function(){
            this.total = this.houseHoldPts + this.houseSizePts;
        }
    };
    cfpData.calcTotal();    // calculate the totals after the object is instantiated

    cfpDataList.push(cfpData);  // push the object to the array
}

// load any data saved to local storage
setCFPData(localLoad("cfp"));
if(cfpDataList.length){     // render if stored data present
    renderTbl(cfpDataList);
}

//---- Event Handlers

// on field focus loss
FNAME.addEventListener("blur", (e) => validateFieldInput(e.target));
LNAME.addEventListener("blur", (e) => validateFieldInput(e.target));
HMEMBERS.addEventListener("blur", (e) => validateFieldInput(e.target));

// on form submission
FORM.addEventListener("submit", function(e){
    e.preventDefault();
    const firstName = FNAME.value;
    const lastName = LNAME.value;
    const houseMembers = parseInt(HMEMBERS.value);
    const houseSize = HSIZE.value;

    // final check for valid field inputs
    if(validateFieldInput(FNAME, LNAME, HMEMBERS, HSIZE)){
//        addCFRecord(firstName, lastName, houseMembers, houseSize);
        const objFP = new Footprint(firstName, lastName, houseMembers, houseSize);
        cfpDataList.push(objFP);            // save to main data array
        localSave(cfpDataList, "cfp");      // save to local storage
        renderTbl(cfpDataList);             // render to page
        FORM.reset();
    }
});

// const me = {
//     name:       "Jay",
//     hairColor:  "black",
//     location:   "work",
//     sleepScore: 78,
//     introduce:  function() {
//         console.log(this);
//         console.log(`This is ${this.name} with ${this.hairColor} hair color is at ${this.location} right now.`);
//     }
// }

// const you = {
//     name:       "Jane",
//     hairColor:  "blonde",
//     location:   "school",
//     sleepScore: 82,
//     introduce:  function() {
//         console.log(this);
//         console.log(`This is ${this.name} with ${this.hairColor} hair color is at ${this.location} right now.`);
//     }
// }

// me.introduce();
// you.introduce();

class Human {
    constructor(name, hairColor, location, sleepScore) {
        this.name = name;
        this.hairColor = hairColor;
        this.location = location;
        this.sleepScore = sleepScore;
    }

    introduce() {
        console.log(`This is ${this.name} with ${this.hairColor} hair color is at ${this.location} right now and had a sleep score of ${this.sleepScore}.`);
    }
}

const jay = new Human("Jay", "black", "work", 78);
const jane = new Human("Jane", "blonde", "school", 82);

jay.introduce();
jane.introduce();

// forcing change, class included with previous commit

jay.hrv = 84;
