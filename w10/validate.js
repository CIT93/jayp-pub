// ensure given field is valid, return false if not
const validateFieldInput = function(field){
    const errMsg = document.getElementById("error_message");    // div for error message output
    if(field.value === ""){
        // input is invalid, output the error and add invalid class
        errMsg.textContent = `ERROR: Field "${field.id}" is required.`;
        field.classList.add("invalid");
        return false;
    }
    // input is valid, clear the error message and invalid class
    errMsg.textContent = "";
    field.classList.remove("invalid");
    return true;
}

export { validateFieldInput };
