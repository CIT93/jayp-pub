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

    textOutput.appendChild(makeTextReport(arrData));                    // simple text report
    textGraphicsOutput.appendChild(makeTextGraphicReport(arrData));     // text graphics report
    graphicsOutput.appendChild(makeGraph(arrData));                     // fully graphical report
}

main();     // begin execution

// convert a CSV string into a 2D array
// (condensed function form of the Level 2 Exercise)
function csvToArray(txtData){
    let table = [];

    let inText = txtData.split("\n");       // split the input string by line
    for(let line of inText){
        // the line must have at least 2 fields (1 comma) to be identified as
        // proper CSV data, otherwise we skip that line
        if(line.includes(",")){
            let record = [];
            let dat = line.split(",");      // split each line by commas
            for(let item of dat){           // add each field into record
                record.push(item.trim());   // remove leading and trailing whitespace
            }
            table.push(record);             // add the record to the table
        }
    }
    return table;
}

// generate a simple text report
function makeTextReport(table){
    const report = document.createElement("div");
    for(dat of table){
        const line = document.createElement("div");
        let country = dat[0];
        let deaths = commify(dat[1]);
        line.textContent = `Country: ${country}, Deaths: ${deaths}`;
        report.appendChild(line);
    }
    return report;
}

// find the minimum and maximum values in numbers of deaths from the table
function findDeathMinMax(table){
    let firstDeaths = parseInt(table[0][1]);
    let minmax = [firstDeaths, firstDeaths];    // min will be first value, max will be second
    for(let dat of table){
        let deaths = parseInt(dat[1]);
        if(minmax[0] > deaths){
            minmax[0] = deaths;
        }
        if(minmax[1] < deaths){
            minmax[1] = deaths;
        }
    }
    return minmax;
}

// generate a legend for a bar
function makeBarLegend(dat){
    let country = dat[0];
    let deaths = dat[1];
    let abbrDeaths = deaths >= 1000000 ? (deaths/1000000).toFixed(2) + "M" : (deaths/1000).toFixed(2) + "K";
    return `${country}, ${abbrDeaths}`;
}

// generate a text graphics report
function makeTextGraphicReport(table){
    const cols = 32;    // max length of histogram bar
    const bar = "=";    // character for body of bar
    const barCaps = ["[", "]"]; // characters for front and back caps of bar
    const report = document.createElement("div");

    // we need to find the min and max values for deaths to calculate bar length
    minmax = findDeathMinMax(table);
    for(let dat of table){
        const line = document.createElement("div");
        let country = dat[0];
        let deaths = dat[1];
        // calculate how many bars to print
        let bars = mapRange(deaths, minmax[0], minmax[1], 1, cols);
        // create the bar and legend
        line.textContent = "[" + bar.repeat(bars) + `] (${makeBarLegend(dat)})`;
        report.appendChild(line);
    }
    return report;
}

// map a value linearly from one range into another, return the new value
function mapRange(value, min1, max1, min2, max2){
    return (value - min1) * (max2 - min2) / (max1 - min1) + min2;
}

// reformat a large number with commas, return as string, use with integers only
function commify(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// create a fully graphical report in a canvas
function makeGraph(table){
    const canvasWidth = 800;    // we'll hard-code it for now
    // It seems some browsers think the inner width is a little larger than it
    // actually is, so we'll scale it down to 90% of the reported width.
    const widthScale = 0.9;
    const rowHeight = 32;       // pixel height per row
    const barHeight = 28;       // pixel height of bar, should be smaller than rowHeight
    const barLength = 0.75;     // max length of bars as percentage of canvas
    const minBarLen = 10;       // pixels of shortest bar
    const legendScale = 0.7;    // font scale for legend compared to bar height
    const legendPadding = 12;   // pixels between bar and legend
    const legendNudgeDown = 21; // nudge legend down a bit due to text placement differences
    const barColorStart = "black";  // these must be valid CSS fillstyles
    const barColorMid = "red";
    const barColorEnd = "maroon";
    const textColor = "black";

    // create and configure our canvas
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = rowHeight * table.length;   // make the canvas high enough for all our data
    canvas.style.border = "1px solid";          // thin border around whole canvas, just to see it

    const ctx = canvas.getContext("2d");    // get our 2-D drawing context
    // we need to find the min and max values of deaths to calculate bar length
    minmax = findDeathMinMax(table);
    for(let idx in table){
        idx = parseInt(idx);    // seriously? JavaScript arrays indices are string keys?
        let country = table[idx][0];
        let deaths = table[idx][1];
        // calculate length of the bar
        let len = mapRange(deaths, minmax[0], minmax[1], minBarLen, canvas.width * barLength);
        // draw the bar
        const barGradient = ctx.createLinearGradient(0, 0, len, 0);     // make a gradient over the bar length
        barGradient.addColorStop(0, barColorStart);                     // from start to end color
        barGradient.addColorStop(0.5, barColorMid);
        barGradient.addColorStop(1, barColorEnd);
        ctx.fillStyle = barGradient;
        ctx.fillRect(0, idx * rowHeight, len, barHeight);
        // draw the legend
        ctx.fillStyle = textColor;
        ctx.font = `${barHeight * legendScale}px serif`;
        ctx.fillText(makeBarLegend(table[idx]), len + legendPadding, idx * rowHeight + legendNudgeDown);
    }
    return canvas;
}
