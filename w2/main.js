// private carbon footprint values
// method used from https://www.wikihow.com/Calculate-Your-Carbon-Footprint
const priHousehold = 6;
const priHomeSize = 7;
const priDiet = 10;
const priWaterConsumption = 2;
const priPurchases = 6;
const priGarbage = 30;
const priRecycling = 8;
const priTransportation = 8;

    // It appears querySelector() uses CSS selection syntax, so we can
    // select the priFoodprint element by id.
const priFootprint = document.querySelector("#priFootprint");

// calculate and display total private carbon footprint
let priCalcFootprint = priHousehold + priHomeSize + priDiet + priWaterConsumption
    + priPurchases + priGarbage + priRecycling + priTransportation;
priFootprint.textContent = priCalcFootprint;

/* ----------------
    Because I had some extra time this weekend:
    Let's calculate carbon footprint level from form elements and display it!
*/

//  This function is tied to the "onclick" attribute of the Recalcuate button.
//  Interesting way to attach JavaScript code to controls.
//
function calculatePubFootprint() {
    const pubFootprint = document.querySelector("#pubFootprint");
    let pubCalcFootprint = 0;

        // It looks like a "value" attribute may be retrieved using class syntax, but it is
        // retrieved as a string (I think?) and needs to be cast into an int for calculations
        // by using parseInt().
    pubCalcFootprint += parseInt(document.querySelector('input[name="household"]:checked').value);  // add household size
    pubCalcFootprint += parseInt(document.querySelector('input[name="housesize"]:checked').value);  // add house size
    pubCalcFootprint += parseInt(document.querySelector('input[name="foodtype"]:checked').value);   // add food type
        // ternary operator, checking if checkbox is checked
    pubCalcFootprint += document.querySelector('input[name="foodPrepackaged"]').checked ? 14 : 0;   // extra for prepackaged foods
    pubCalcFootprint += parseInt(document.querySelector('input[name="dishwasher"]:checked').value); // add dishwasher use
    pubCalcFootprint += parseInt(document.querySelector('input[name="laundry"]:checked').value);    // add washing machine use
    pubCalcFootprint += parseInt(document.querySelector('input[name="purchases"]:checked').value);  // add annual purchases
    pubCalcFootprint += parseInt(document.querySelector('input[name="garbage"]:checked').value);    // add garbage
        // We use querySelectorAll().length to count the total number of "recycle" checkboxes
        // that have been checked, each of which is worth -2 points
    let recyclingTotal = document.querySelectorAll('input[name="recycle"]:checked').length;         // add recycling
    pubCalcFootprint += 24 - recyclingTotal * 2;
    pubCalcFootprint += parseInt(document.querySelector('input[name="vehicle"]:checked').value);    // add personal vehicle
    pubCalcFootprint += parseInt(document.querySelector('input[name="publicTransport"]:checked').value);    // add public transport
    pubCalcFootprint += parseInt(document.querySelector('input[name="flights"]:checked').value);    // add flights

    pubFootprint.textContent = pubCalcFootprint;
}
