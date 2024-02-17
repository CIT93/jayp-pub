import { renderTbl } from "./render.js";
import { determineHouseSizePts, determineHouseholdPts } from "./footprint.js";

const FORM = document.getElementById("form");
const OUTPUT = document.getElementById("output");
const cfpDataList = [];

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

FORM.addEventListener("submit", function(e){
    e.preventDefault();
    const firstName = FORM.firstname.value;
    const lastName = FORM.lastname.value;
    const houseMembers = parseInt(FORM.housemembers.value);
    const houseSize = FORM.housesize.value;

    addCFRecord(firstName, lastName, houseMembers, houseSize);
    OUTPUT.innerHTML = "";
    renderTbl(cfpDataList);
    FORM.reset();
});
