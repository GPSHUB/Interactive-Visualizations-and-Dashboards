// Use the D3 library to read in samples.json. I called JSON data 'importData'
function buildCharts(id) {
    d3.json("samples.json").then(function (importData) {                        
        let data = importData;
        let filterData = importData.samples.filter(sample => sample.id === id);            
        let demoData = data.metadata.filter(metaData => metaData.id == id);
        console.log(data);
        //clear html for next sample
        let pbody = d3.select("#sample-metadata");
        pbody.html('')
        
        // loop - append key-value to html id sample-metatdata 
        Object.entries(demoData[0]).forEach(
            ([key, value]) => d3.select("#sample-metadata")
            .append("p").text(`${key}: ${value}`)
        );
        
        // MEILI - IS THERE A CLEANER WAY TO DO THIS?
        let topTenSampleValues = [
            filterData[0].sample_values[0], 
            filterData[0].sample_values[1], 
            filterData[0].sample_values[2], 
            filterData[0].sample_values[3], 
            filterData[0].sample_values[4], 
            filterData[0].sample_values[5], 
            filterData[0].sample_values[6], 
            filterData[0].sample_values[7], 
            filterData[0].sample_values[8], 
            filterData[0].sample_values[9]]
        let topTenOTU = [
            filterData[0].otu_ids[0], 
            filterData[0].otu_ids[1], 
            filterData[0].otu_ids[2], 
            filterData[0].otu_ids[3], 
            filterData[0].otu_ids[4], 
            filterData[0].otu_ids[5], 
            filterData[0].otu_ids[6], 
            filterData[0].otu_ids[7], 
            filterData[0].otu_ids[8], 
            filterData[0].otu_ids[9]]
        let topTenOTULabels = [
            filterData[0].otu_labels[0], 
            filterData[0].otu_labels[1], 
            filterData[0].otu_labels[2], 
            filterData[0].otu_labels[3], 
            filterData[0].otu_labels[4], 
            filterData[0].otu_labels[5], 
            filterData[0].otu_labels[6], 
            filterData[0].otu_labels[7], 
            filterData[0].otu_labels[8], 
            filterData[0].otu_labels[9]]
            
        let labelArray = []

        //concat OTU to array for labels
        for (let i = 0; i < 10; i++) {
            labelArray.push("OTU " + filterData[0].otu_ids[i])            
        }
        
        // Create the Trace
        let trace1 = {
            x: topTenSampleValues.reverse(),
            y: labelArray,
            mode: 'markers',
            marker: { size: 16 },
            text: topTenOTULabels,
            type: 'bar',
            orientation: 'h'
        };
        
        // // Create the importData array for our plot
        let data2 = [trace1];

        // // Define our plot layout
        let layout = {
            title: "OTU vs Sample Values",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" },
            showlegend: false,                
        };
        
        // // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data2, layout);

        //BUBBLE PLOT 
        let bubbleTrace = {
            x: topTenOTU, //[0, 1, 2, 3, 4, 5, 6],
            y: topTenSampleValues, //[1, 9, 4, 7, 5, 2, 4],
            mode: 'markers',
            marker: {
                size: topTenSampleValues,
                color: topTenOTU
            },
            text: topTenOTULabels
        };
        let bubbleData = [bubbleTrace];
        let bubbleLayout = {
            title: 'Marker Size',
            xaxis: { title: "TK1" },
            yaxis: { title: "TK2" },
            showlegend: false,
            height: 600,
            width: 1200
        };
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    })
}
//sends new id in everytime drop down changes
function optionChanged(dropDownValue) {
    buildCharts(dropDownValue)
}
function init() {    
    let dropDownBtn = d3.select("#selDataset");
    d3.json("samples.json")
        .then(function (importData) {
            let names = importData.names
            names.forEach(name => {
                dropDownBtn.append("option")
                    .text(name)
                    .attr("value", name)
            })
            importData.samples.forEach(sampleValues => console.log(sampleValues));

            // for demographics area on load
            let demo = importData.metadata.filter(sample => sample.id)[0];
            console.log(demo);
            Object.entries(demo).forEach(
                ([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
            );
            buildCharts(names[0])
        });
}
init();