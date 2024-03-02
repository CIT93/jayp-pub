// save an array to local storage with a given key
function localSave(key, arr){
    const serialized = JSON.stringify(arr);
    localStorage.setItem(key, serialized);
}

// load an array from local storage using a given key
function localLoad(key){
    const serialized = localStorage.getItem(key);
    if(serialized){
        return JSON.parse(serialized);
    }
    return [];  // no data, return empty array
}

export {localSave, localLoad};
