const elem = {
    FORM:       document.getElementById("form"),
    SUBMIT:     document.getElementById("submit"),
    OUTPUT:     document.getElementById("output"),
    EXERCISE:   document.getElementById("exercise"),
    SETS:       document.getElementById("sets"),
    TIME:       document.getElementById("time"),
    REST:       document.getElementById("rest"),
    ERROR:      document.getElementById("error"),
};

const config = {
    default_sets:       3,      // default number of sets
    default_time:       1.0,    // default minutes per set
    default_countdown:  15,     // default countdown seconds before each set
};

export { config, elem };
