// from https://plotly.com/javascript/gauge-charts/
function gauge_chart(id) {
    d3.json("samples.json").then(function (importData) {                                
        let filterData = importData.metadata.filter(metaData => metaData.id == id);                
        
    let data3 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: filterData[0].wfreq,
      title: { text: "Belly Button Washing Frequency per Week"},
      type: "indicator",
      mode: "gauge+number",   
      
      gauge: {
        axis: { range: [null, 10]},
        steps: [
          { range: [0,1], color: "#ebfaeb" },
          { range: [1,2], color: "#adebad" },
          { range: [2,3], color: "#85e085" },
          { range: [3,4], color: "#5cd65c" },
          { range: [4,5], color: "#33cc33" },
          { range: [5,6], color: "#29a329" },
          { range: [6,7], color: "#1f7a1f" },
          { range: [7,8], color: "#196619" },
          { range: [8,9], color: "#145214" },
          { range: [9,10], color: "#051405" }
        ], // color picker: https://www.w3schools.com/colors/colors_picker.asp
        threshold: {
          domain: { x: [0, 1], y: [0, 1] },
          value: filterData[0].wfreq,
          line: { color: "red", width: 6},
          thickness: 1,
          value: filterData[0].wfreq
          
        }
      }
    }
  ];
  
  let layout = { width: 600, height: 450, margin: { t: 0, b: 0 },  };
  Plotly.newPlot("gauge", data3, layout);


})
}

