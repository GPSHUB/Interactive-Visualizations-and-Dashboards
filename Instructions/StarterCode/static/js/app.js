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

        //concat OTU to array for labels
        for (let i = 0; i < 10; i++) {
            labelArray.push("OTU " + filterData[0].otu_ids[i])            
        }
        
        // Create the Trace
        let trace1 = {
            x: topTenSampleValues,
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
            xaxis: { title: "Top 10 OTU" },
            yaxis: { title: "Top 10 OTU Values" },
            showlegend: false,
            height: 600,
            width: 1200
        };
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    })
}
//sends new id in everytime drop down changes
function optionChanged(dropDownValue) {
    buildCharts(dropDownValue);
    gauge_chart(dropDownValue)
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
            buildCharts(names[0]);
            gauge_chart(names[0]);
        });
}
init();