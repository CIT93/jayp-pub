// ensure given fields are valid, return false if one or more are not
const validateFieldInput = (...fields) => {
    const errMsg = document.getElementById("error_message");    // div for error message output
    let hasInvalid = false;
    const msgs = [];

    for(const field of fields){
        if(field.value === ""){
            // input is invalid, queue the error and add invalid class
            msgs.push(`ERROR: Field "${field.id}" is required.`);
            field.classList.add("invalid");
            hasInvalid = true;
        }else{
            // input field is valid, remove invalid class
            field.classList.remove("invalid");
        }
    }

    if(hasInvalid){
        errMsg.innerHTML = msgs.join("<br />");     // display all errors
        return false;
    }
    errMsg.textContent = "";    // all fields are valid
    return true;
}

export { validateFieldInput };
