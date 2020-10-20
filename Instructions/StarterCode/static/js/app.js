// Use the D3 library to read in samples.json. I called JSON data 'importData'
d3.json("samples.json").then((importData) =>{
    console.log(importData);
    let data = importData;

// Isolating test subject names for the dropdown menu
    let subjectNames = data.names;
    console.log(subjectNames);

// Appending looped test subject names to the dropdown menu ID in the index.html
// https://stackoverflow.com/questions/43121679/how-to-append-option-into-select-combo-box-in-d3
    subjectNames.forEach((name) => {
        d3.select("#selDataset").append('option').text(name)})

// Isolating objects for insertion into demo info table
    let demoInfo = data.metadata.filter(sample => sample.id)[0];
    console.log(demoInfo);

// class act 14 / day 2 / activity 7 line 15 // append("p") means append new paragraph
// Appending looped metadata object entries to the demo info panel in the index.html
    Object.entries(demoInfo).forEach(
        ([key,value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
    );
});

//NEED TO CONNECT DROP DOWN TO DEMO INFO VIA EVENT LISTENERS AND HANDLERS