// We'll use a single object for all our global data, simply to not clutter
// the global namespace.
const dataVis = {
    txtDataHeader:      `COVID-19 Deaths by Country, Top 18`,
    txtDataSource:      `Source: Our World in Data, updated Feb. 3, 2024`,
    txtCovidDeaths:     `
        United States, 1165780
        Brazil, 702116
        India, 533434
        Russia, 401773
        Mexico, 334958
        United Kingdom, 232112
        Peru, 221583
        Italy, 195805
        Germany, 174979
        France, 167985
        Indonesia, 162033
        Iran, 146777
        Colombia, 142727
        Argentina, 130699
        China, 121916
        Spain, 121852
        Poland, 120550
        Ukraine, 109918
        `,
};

// make an array variable that will eventually contain our table of data
let arrCovidDeaths = [];

// split the string into an array, each element containig a single line of text
const myLines = dataVis.txtCovidDeaths.split("\n");
// loop through each line
for(const line of myLines){
    // Some of the lines in our string are just blank lines. So to perform some
    // basic validation checking to stop us from trying to process blank lines and
    // breaking our program, we check if the line includes at least one comma.
    // A more robust program would perform even more strict validation checks, but
    // since we copy-pasted this data, then this is good enough for us.
    if(line.includes(",")){
        // we make a new array that will contain a single record (data from a single line)
        let record = [];

        // split the line into fields between commas
        let fields = line.split(",");
        // loop over each of the fields that we found; for us, each line has 2 fields
        for(let dat of fields){
            // trim out any leading and trailing whitespace, and save it back to dat
            dat = dat.trim();
            // push the data into the record array
            record.push(dat);
        }
        // push the record array into our main table array
        arrCovidDeaths.push(record);
    }
}

// log our final array to the console to make sure it looks good!
console.log(arrCovidDeaths);

// Note: We are actually still storing the 2nd field as a string. If we wanted to perform
// any arithmetic on it, then we could parseInt() before storing it. But sometimes we want
// to perform string operations on it as well, so sometimes it is good to store it as a
// string for now, and then we can parseInt() later when we need to do any math.
