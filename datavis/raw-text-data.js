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

// Level 2 Exercise: Above, dataVis.txtCovidDeaths is just a copy-pasted string of data.
// Convert it programmatically into an array of arrays that looks like:
//
//  arrCovidDeaths = [
//      ["United States", 1165780],
//      ["Brazil", 702116],
//      ...etc.
//  ];
//
// See the learning++ post/video for details and some hints!
