import { renderTbl } from "./render.js";
import { determineHouseSizePts, determineHouseholdPts } from "./footprint.js";
import { FORM, cfpDataList } from "./global.js";

const FIRSTNAME = document.getElementById("firstname");
const LASTNAME = document.getElementById("lastname");
const HOUSEMEMBERS = document.getElementById("housemembers");

// add a record to the data list
function addCFRecord( firstname, lastname, householdMembers, houseSize ){
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

// We have our validateFieldInput() function work on a given field so that we
// can use it for both the focus loss event handlers, and the form submission
// handler.

// ensure given field is valid, return false if not
function validateFieldInput(field){
    const errMsg = document.getElementById("error_message");    // div for error message output
    if(field.value === ""){
        // intput is invalid, output the error and add invalid class
        errMsg.textContent = `ERROR: Field "${field.id}" is required.`;
        field.classList.add("invalid");
        return false;
    }
    // intput is valid, clear the error message and invalid class
    errMsg.textContent = "";
    field.classList.remove("invalid");
    return true;
}

// on field focus loss
FIRSTNAME.addEventListener("blur", (e) => validateFieldInput(e.target));
LASTNAME.addEventListener("blur", (e) => validateFieldInput(e.target));
HOUSEMEMBERS.addEventListener("blur", (e) => validateFieldInput(e.target));

// on form submission
FORM.addEventListener("submit", function(e){
    e.preventDefault();
    const firstName = FORM.firstname.value;
    const lastName = FORM.lastname.value;
    const houseMembers = parseInt(FORM.housemembers.value);
    const houseSize = FORM.housesize.value;

    // final check for valid field inputs
    if(validateFieldInput(FIRSTNAME) && validateFieldInput(LASTNAME) && validateFieldInput(HOUSEMEMBERS)){
        addCFRecord(firstName, lastName, houseMembers, houseSize);
        renderTbl(cfpDataList);
        FORM.reset();
    }
});
