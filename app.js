// Use the D3 library to read in samples.json. 
function buildCharts(id) {

    // I called all samples.json information 'jsonData'
    d3.json("samples.json").then(function (jsonData) {  
        let data = jsonData;        
        let demoData = data.metadata.filter(metaData => metaData.id == id);        
        // delivers test subject id number from metadata ID 
        
        //clear html for next sample
        let body = d3.select("#sample-metadata");
        body.html('')
        
        // loop key-value append to html id sample-metatdata 
        Object.entries(demoData[0]).forEach(
            ([key, value]) => d3.select("#sample-metadata")
            .append("p").text(`${key}: ${value}`)
        );
        // delivers test subject id number from samples ID 
        let filterData = jsonData.samples.filter(sample => sample.id === id);  

        // Top 10 parsing and ordering in reverse
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
            // Use sample_values as the values for the bar chart.
            x: topTenSampleValues,
            // Use otu_ids as the labels for the bar chart.
            y: labelArray,
            mode: 'markers',
            marker: { size: 16, color: 'green' },
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
        
        // Plot the bar chart
        Plotly.newPlot("bar", barData, barLayout);

        // BUBBLE PLOT 
        let bubbleTrace = {
            // Use otu_ids for the x values.
            x: topTenOTU, 
            // Use sample_values for the y values.
            y: topTenSampleValues, 
            mode: 'markers',
            marker: {
                // Use sample_values for the marker size.
                size: topTenSampleValues,
                // Use otu_ids for the marker colors.
                color: topTenOTU,                
                opacity: [.5],
            },
            // Use otu_labels for the text values.
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
        // Plot the bubble chart
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    })
}

// Each time the drop down changes, a new ID is delivered
function optionChanged(dropDownValue) {
    buildCharts(dropDownValue);
    gauge_chart(dropDownValue)
}
// Initialize 
function init() {    
    let dropDownButton = d3.select("#selDataset");
    d3.json("samples.json")
        .then(function (jsonData) {
            let names = jsonData.names

            names.forEach(name => {
                dropDownButton.append("option")
                    .text(name)
                    .attr("value", name)

            })

            jsonData.samples.forEach(sampleValues => console.log(sampleValues));

            // For demo panel upon load
            let demo = jsonData.metadata.filter(sample => sample.id)[0];
            console.log(demo);

            Object.entries(demo).forEach(
                ([key, value]) => d3.select("#sample-metadata")
                .append("p").text(`${key}: ${value}`)
            );

            buildCharts(names[0]);
            gauge_chart(names[0]);

        });
}
init();