const FORM = document.getElementById("form");
const TBL = document.getElementById("tab-data");
let cfpDataList = [];

// apparently, variables import from modules are always forced to be constant
// so we need a kind of "module setter"
function setCFPData(data){
    cfpDataList = data;
}

export { FORM, TBL, cfpDataList, setCFPData };
