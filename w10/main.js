import { renderTbl } from "./render.js";
import { determineHouseSizePts, determineHouseholdPts } from "./footprint.js";
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
        addCFRecord(firstName, lastName, houseMembers, houseSize);
        localSave(cfpDataList, "cfp");      // save to local storage
        renderTbl(cfpDataList);             // render to page
        FORM.reset();
    }
});
