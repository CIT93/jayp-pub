// save an array to local storage with a given key
const localSave = (arr, key = "default") => {
    const serialized = JSON.stringify(arr);
    localStorage.setItem(key, serialized);
}

// load an array from local storage using a given key
const localLoad = (key = "default") => {
    const serialized = localStorage.getItem(key);
    if(serialized){
        return JSON.parse(serialized);
    }
    return [];  // no data, return empty array
}

export { localSave, localLoad };
