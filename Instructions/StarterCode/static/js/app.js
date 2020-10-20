// 1. Use the D3 library to read in samples.json.
//// Use D3 fetch to read the JSON file 15 / day 3 / act 7 / lines 3-5
d3.json("samples.json").then((importedData) => {
    let allData = importedData;
    console.log(allData);
    // // CONSOLE RETURNS ALL Objects: names (153), metadata(153), samples (153)
    // let namesData = allData.names;
    // console.log(namesData);
    // CONSOLE RETURNS ALL Objects specific to names: ['940', '941', etc...]
    let metaData = allData.metadata;
    console.log(metaData);
    // CONSOLE RETURNS ALL Objects specific to metadata: [{id: 940, ethnicity: "Caucasian", gender: "F", age: 24, location: "Beaufort/NC", wfreq: 2]}
    // let samplesData = allData.samples;
    // console.log(samplesData);
    //CONSOLE RETURNS ALL Objects specific to samples: {id: "940", otu_ids: Array(80), sample_values: Array(80), otu_labels: Array(80) EX-BACTERIA, sample_values: (80) EX 163, 126]}
    
});
    
////////////////////////// 0 //////////////////////////

// Defining data categories for charting
// 
// let  = importedData.names;
// let samplesData = importedData.samples;
    // 
//     console.log(namesData);
//     console.log(samplesData);
 
////////////////////////// 0 //////////////////////////
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 
//    OTUs found in that individual. 15 / day 3 / act 7 / lines 18-44

// Assign top 10 OTU variable for charting

// Trace1 for the Horizontal Bar
// let trace1 = {
//     x: importedData.map(row => row.metadata),
//     y: importedData.map(row => row.greekName),
//     text: importedData.map(row => row.greekName),
//     name: "Greek",
//     type: "bar",
//     orientation: "h"
//   };

//   // importedData
//   let chartData = [trace1];

//   // Apply the group bar mode to the layout
//   let layout = {
//     title: "Greek gods search results",
//     margin: {
//       l: 100,
//       r: 100,
//       t: 100,
//       b: 100
//     }
//   };


//   // Render the plot to the div tag with id "plot"
//   Plotly.newPlot("plot", chartData, layout);
// });
    // a. Use sample_values as the values for the bar chart.

    // b. Use otu_ids as the labels for the bar chart.

    // c. Use otu_labels as the hovertext for the chart.

// 3. Create a bubble chart that displays each sample.

    // a. Use otu_ids for the x values.

    // b. Use sample_values for the y values.

    // c. Use sample_values for the marker size.

    // d. Use otu_ids for the marker colors.

    // e. Use otu_labels for the text values.

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// 6. Update all of the plots any time that a new sample is selected.