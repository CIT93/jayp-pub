// private carbon footprint values
// method used from https://www.wikihow.com/Calculate-Your-Carbon-Footprint
const priHousehold = 6;
const priHomeSize = 7;
const priDiet = 10;
const priWaterConsumption = 2;
const priPurchases = 6;
const priGarbage = 30;
const priRecycling = 8;
const priTransportation = 6;

// select private footprint element by id
const priFootprint = document.querySelector("#priFootprint");

// calculate and display total private carbon footprint
let priCalcFootprint = priHousehold + priHomeSize + priDiet + priWaterConsumption + priPurchases + priGarbage + priRecycling + priTransportation;
priFootprint.textContent = priCalcFootprint;
