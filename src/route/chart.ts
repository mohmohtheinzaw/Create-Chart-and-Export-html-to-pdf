const express = require("express")
const router = express.Router()
import jsPDF from "jspdf";

const ChartJsImage = require('chartjs-to-image');

const myChart = new ChartJsImage();

var xLabels = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
myChart.setConfig({
  type: 'bar',
  data: { 
    labels:xLabels,
    datasets: [
        {
          label: 'low',
          backgroundColor: 'blue',
          data: [12, 19, 3, 5, 2, 3, 14, 3, 6, 2, 9, 1, 33, 23, 25],
        },
        {
          label: 'High',
          backgroundColor: 'red',
          data: [6, 3, 12, 4, 8, 1, 9, 8, 5, 3, 4, 6, 8, 10, 19],
        },
      ]
},
});

router.get("/chart",async function (){
    try {
        const dataUrl = await myChart.toDataUrl();
        console.log(dataUrl);
        return dataUrl
    } catch (error) {
        console.log(error)
    }
});

router.get("/export-to-pdf",async function(){
    try {
        const dataUrl = await myChart.toDataUrl()
        const pdf = new jsPDF()
        pdf.addImage(dataUrl,"PNG",10,10,100,75);
        pdf.save("BarChart.pdf");
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
