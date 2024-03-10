import { TBL, FNAME, LNAME, HMEMBERS, HSIZE, FCHOICE, FTYPE } from "./global.js";
import { localSave } from "./storage.js";

// create the structure for the table heading and return it
const makeTblHead = () => {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const headingTextArr = ["Name", "Household", "House Size", "Food Choice", "Food Type", "Footprint", "Actions"];

    headingTextArr.forEach((text) => {
        const th = document.createElement("th");
        th.textContent = text;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    return thead;
}

// create a table row (tr) with the given data and return it
const makeTblRow = (data, record, idx) => {
    const tr = document.createElement("tr");
    for(const [key, value] of Object.entries(record)){
        // render only fields we want
        switch(key){
            case "firstName":
            case "householdMembers":
            case "houseSize":
            case "foodChoice":
            case "foodType":
            case "total":
                tr.appendChild(makeTblField(value));    // make a cell for each wanted field
                break;
        }
    }
    tr.appendChild(makeActionButtons(data, record, idx));    // make the action buttons
    return tr;
}

// create a table field (td) with the given data and return it
const makeTblField = (data) => {
    const td = document.createElement("td");
    td.textContent = data;
    return td;
}

// delete a record by index
const deleteRecord = (data, idx) => {
    data.splice(idx, 1);        // remove the record at idx
    localSave(data, "cfp");     // save changed table to local storage
    renderTbl(data);            // re-render the table
}

// create action button elements in a field (td) and return it
const makeActionButtons = (data, record, idx) => {
    const td = document.createElement("td");
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    td.appendChild(btnEdit);
    const btnDel = document.createElement("button");
    btnDel.textContent = "Del";
    td.appendChild(btnDel);

    btnDel.addEventListener("click", (e) => {
        deleteRecord(data, idx);
    });
    btnEdit.addEventListener("click", (e) => {
        // repopulate the original form's fields
        FNAME.value = record.firstName;
        LNAME.value = record.lastName;
        HMEMBERS.value = record.householdMembers;
        HSIZE.value = record.houseSize;
        FCHOICE.value = record.foodChoice;
        FTYPE.value = record.foodType;
        // delete the old record
        deleteRecord(data, idx);
    });
    return td;
}

// create the structure for the table body and return it
const makeTblBody = (data) => {
    const tbody = document.createElement("tbody");
    data.forEach((record, idx) => {
        tbody.appendChild(makeTblRow(data, record, idx));      // make a row for each record
    });
    return tbody;
}

// render the entire table using the given data
const renderTbl = (data) => {
    // clear the table from any previous reports
    while(TBL.firstChild){
        TBL.removeChild(TBL.lastChild);     // remove from end, probably more efficient
    }
    // render the table only if there is any data to render
    if(data.length){
        const table = document.createElement("table");
        table.appendChild(makeTblHead());   // add the heading to the table
        table.appendChild(makeTblBody(data));   // add the data to the table
        TBL.appendChild(table);
    }
}

export {renderTbl}
