const TBL = document.getElementById("tab-data");

// Notes: Slightly different than the video solution, I use these functions to only construct
// the elements, and the calling functions actually attach them to the table.

// create the structure for the table heading and return it
function makeTblHead(){
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    const headingTextArr = ["Name", "Household", "HouseSize", "Footprint", "Actions"];

    headingTextArr.forEach(function(text){
        const th = document.createElement("th");
        th.textContent = text;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    return thead;
}

// create a table field (td) with the given data and return it
function makeTblField(data){
    const td = document.createElement("td");
    td.textContent = data;
    return td;
}

// create action button elements in a field (td) and return it
function makeActionButtons(){
    const td = document.createElement("td");
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    td.appendChild(btnEdit);
    const btnDel = document.createElement("button");
    btnDel.textContent = "Del";
    td.appendChild(btnDel);
    return td;
}

// create the structure for the table body and return it
function makeTblBody(data){
    const tbody = document.createElement("tbody");
    data.forEach(function(record){
        const tr = document.createElement("tr");
        // the fields do not match the columns, so we must manually create all <td>
        tr.appendChild(makeTblField(`${record.firstName} ${record.lastName}`));
        tr.appendChild(makeTblField(record.householdMembers));
        tr.appendChild(makeTblField(record.houseSize));
        tr.appendChild(makeTblField(record.total));
        tr.appendChild(makeActionButtons());
        tbody.appendChild(tr);
    });
    return tbody;
}

// render the entire table using the given data
function renderTbl(data){
    // clear the table from any previous reports
    while(TBL.firstChild){
        TBL.removeChild(TBL.lastChild);     // remove from end, probably more efficient
    }
    const table = document.createElement("table");
    table.appendChild(makeTblHead());   // add the heading to the table
    table.appendChild(makeTblBody(data));   // add the data to the table
    TBL.appendChild(table);
}

export {renderTbl}
