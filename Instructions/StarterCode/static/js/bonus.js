function gauge_chart(id) {
    d3.json("samples.json").then(function (importData) {                        
        //let data = importData;
        let filterData = importData.metadata.filter(metaData => metaData.id == id);            
    console.log(filterData[0].wfreq);
        
    let data3 = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: filterData[0].wfreq,
      title: { text: "Wash Frequency" },
      type: "indicator",
      mode: "gauge+number+delta",
      delta: { reference: 0 },
      gauge: {
        axis: { range: [null, 10] },
        steps: [
          { range: [0, 1], color: "lightgray" },
          { range: [2, 3], color: "gray" },
          { range: [4,5], color: "lightgray" },
          { range: [7, 8], color: "gray" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 10
        }
      }
    }
  ];
  
  var layout = { width: 400, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot("gauge", data3, layout);


})
}

