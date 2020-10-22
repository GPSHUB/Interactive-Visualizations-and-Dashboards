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
        
        let topTenSampleValues =  filterData[0].sample_values.slice(0,10).reverse();             
        let topTenOTU = filterData[0].otu_ids.slice(0,10).reverse();     
        let topTenOTULabels =  filterData[0].otu_labels.slice(0,10).reverse();          
            
        let labelArray = []

        //Concatenate OTUs to array for labels
        for (let i = 0; i < 10; i++) {
            labelArray.push("OTU " + filterData[0].otu_ids[i])            
        }
        
        // Create the Trace for the bar chart
        let barTrace = {
            x: topTenSampleValues,
            y: labelArray,
            mode: 'markers',
            marker: { size: 16 },
            text: topTenOTULabels,
            type: 'bar',            
            orientation: 'h'
        };
        
        let barData = [barTrace];

        // // Define our plot layout
        let barLayout = {
            title: "OTU vs Sample Values",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" },
            showlegend: false,                
        };
        
        // // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", barData, barLayout);

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
            xaxis: { title: "Top 10 OTU" },
            yaxis: { title: "Top 10 OTU Values" },
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    })
}

// Each time the drop down changes, a new ID is delivered
function optionChanged(dropDownValue) {
    buildCharts(dropDownValue);
    gauge_chart(dropDownValue)
}
function init() {    
    let dropDownButton = d3.select("#selDataset");
    d3.json("samples.json")
        .then(function (importData) {
            let names = importData.names
            names.forEach(name => {
                dropDownButton.append("option")
                    .text(name)
                    .attr("value", name)
            })
            importData.samples.forEach(sampleValues => console.log(sampleValues));

            // For demo panel upon load
            let demo = importData.metadata.filter(sample => sample.id)[0];
            console.log(demo);
            Object.entries(demo).forEach(
                ([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`)
            );
            buildCharts(names[0]);
            gauge_chart(names[0]);
        });
}
init();