const FORM = document.getElementById("form");
const TBL = document.getElementById("tab-data");
const FNAME = FORM.firstname;       // no need to keep calling getElementById()
const LNAME = FORM.lastname;
const HMEMBERS = FORM.housemembers;
const HSIZE = FORM.housesize;
const FCHOICE = FORM.foodchoice;
const FTYPE = FORM.foodtype;
let cfpDataList = [];

// apparently, variables import from modules are always forced to be constant
// so we need a kind of "module setter"
const setCFPData = (data) => {
    cfpDataList = data;
}

export { FORM, TBL, FNAME, LNAME, HMEMBERS, HSIZE, FCHOICE, FTYPE, cfpDataList, setCFPData };
