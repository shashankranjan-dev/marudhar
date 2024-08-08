import React from 'react';
import Chart from "react-apexcharts";
import { ChartColors } from './Colors';
import { currencyFormate } from 'views/Pages/HelperComponent/utils';

const DonutCharts = ({ brandName, amount }) => {
  const series = [44, 55, 41, 17, 15]

//console.log(amount,"sen24012023")
  const options = {
    legend: {
      zoomed:true,
      show: true,
      formatter: function (seriesName, opts) {
        //console.log("sen20012023",brandName)
        return [brandName[opts.seriesIndex]+":  "+ currencyFormate(opts.w.globals.series[opts.seriesIndex])]
      }

    },
    labels:brandName,
    colors:ChartColors,
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
          },
          customScale: 0.5
        }
      }
    }
  

  };

  return (
    <div>
      <Chart
        options={options}
        series={amount}
        type="donut"
        width="700"
      />
    </div>
  )
}

export default DonutCharts;

