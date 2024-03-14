// ensure given fields are valid, return false if one or more are not
const validateFields = (err, ...fields) => {
    let hasInvalid = false;
    const msgs = [];

    for(const field of fields){
        if(field.value === ""){
            // input is invalid, queue the error and add invalid class
            msgs.push(`ERROR: Field "${field.name}" is required.`);
            field.classList.add("invalid");
            hasInvalid = true;
        }else{
            // input field is valid, remove invalid class
            field.classList.remove("invalid");
        }
    }

    if(hasInvalid){
        err.innerHTML = msgs.join("<br />");     // display all errors
        return false;
    }
    err.textContent = "";    // all fields are valid
    return true;
}

export { validateFields };
