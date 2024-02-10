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

function main(){
    // get each of the three output divisions
    let textOutput = document.getElementById("textOut");
    let textGraphicsOutput = document.getElementById("textGraphOut");
    let graphicsOutput = document.getElementById("graphicsOut");
    // display the main headers
    document.getElementById("titleHeader").textContent = dataVis.txtDataHeader;
    document.getElementById("sourceHeader").textContent = dataVis.txtDataSource;
    
    // convert our CSV text data into a table
    let arrData = csvToArray(dataVis.txtCovidDeaths);
    let min, max;   // find min and max values of data[1] (deaths)
    for(dat of arrData){
        let deaths = dat[1];
        if(min == null || min > deaths){
            min = deaths;
        }
        if(max == null || max < deaths){
            max = deaths;
        }
    }

    // output the table as a simple text report
    for(dat of arrData){
        const newDiv = document.createElement("div");
        let country = dat[0];
        let deaths = commify(dat[1]);
        newDiv.textContent = `Country: ${country}, Deaths: ${deaths}`;
        textOutput.appendChild(newDiv);
    }

    // output the table using a text histogram
    const cols = 32;    // max length of histogram bar
    for(dat of arrData){
        const newDiv = document.createElement("div");
        let country = dat[0];
        let deaths = dat[1];
        // calculate how many bars to print
        let bars = mapRange(deaths, min, max, 1, cols);
        // format to thousands or millions, suffix with K or M, to 2 decimal places
        let abbrDeaths = deaths >= 1000000 ? (deaths/1000000).toFixed(2) + "M" : (deaths/1000).toFixed(2) + "K";
        newDiv.textContent = "[" + "=".repeat(bars) + `] (${country}, ${abbrDeaths})`;
        textGraphicsOutput.appendChild(newDiv);
    }
}

main();

// convert a CSV string into a 2D array
function csvToArray(txtData){
    let table = [];

    let inText = txtData.split("\n");   // split the input string by line
    for(let line of inText){
        // the line must have at least 2 fields (1 comma) to be identified as
        // proper CSV data, otherwise we skip that line
        if(line.includes(",")){
            let record = [];
            let dat = line.split(",");  // split each line by commas
            for(let item of dat){   // add each field into record
                record.push(item.trim());   // remove leading and trailing whitespace
            }
            table.push(record);  // add the record to the table
        }
    }
    return table;
}

// map a value from one range into another, return the new value
function mapRange(value, min1, max1, min2, max2){
    return (value - min1) * (max2 - min2) / (max1 - min1) + min2;
}

// reformat a number with commas, return as string
function commify(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
