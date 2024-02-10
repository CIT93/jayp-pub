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

// I took a slightly different approach. I made functions which construct elements, and
// left the appendChild() for the calling functions. This makes the work more granular.
// My calling structure ended up as:
//
//      renderTbl() calls:  appendChild( makeTblHead() )
//                          appendChild( makeTblBody() )
//      makeTblHead() stands alone
//      makeTblBody() calls: appendChild( makeTblField() ) - for each field
//                           appendChild( makeActionButtons() )
//      makeTblField() and makeActionButtons() both stand alone
//
// By "stands alone" I mean they call no further functions.
