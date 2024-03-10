import { renderTbl } from "./render.js";
import { Footprint } from "./footprint.js";
import { FORM, FNAME, LNAME, HMEMBERS, HSIZE, FCHOICE, FTYPE, cfpDataList, setCFPData } from "./global.js";
import { localSave, localLoad } from "./storage.js";
import { validateFieldInput } from "./validate.js";

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
    const foodChoice = FCHOICE.value;
    const foodType = FTYPE.value;

    // final check for valid field inputs
    if(validateFieldInput(FNAME, LNAME, HMEMBERS, HSIZE, FCHOICE, FTYPE)){
        const objFP = new Footprint(firstName, lastName, houseMembers, houseSize, foodChoice, foodType);
        cfpDataList.push(objFP);            // save to main data array
        localSave(cfpDataList, "cfp");      // save to local storage
        renderTbl(cfpDataList);             // render to page
        FORM.reset();
    }
});
