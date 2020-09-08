import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";

const graphStyles = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const Graph = (props) => {
  let firstRecord = props.flightData[0];
  let lastRecord = props.flightData[props.flightData.length - 1];

  //dataset - array of objects
  const [chartDataset, setChartDataset] = useState([]);
  const lineColor = "rgba(230, 65, 47, 0.9)";

  //when provided data changes update dataset
  useEffect(() => {
    formatChartDataset();
  }, [props.flightData]);

  let startTime;
  let chartData = [];

  //calculating good interval of chart lines (not used)
  const getTimeIntervalInMins = (time) => {
    let timeInterval = [5, 10, 15, 30, 60];

    for (let i = 0; i < timeInterval.length - 1; i++) {
      if (time / 8 < timeInterval[i] * 60) {
        return timeInterval[i];
      }
    }
    return timeInterval[timeInterval.length - 1];
  };

  const timeIntervalInMins = getTimeIntervalInMins(props.flightTimeInSecs);

  const timeInSecs = (timeStr) => {
    return (
      parseInt(timeStr.slice(0, 2)) * 3600 +
      parseInt(timeStr.slice(2, 4)) * 60 +
      parseInt(timeStr.slice(4, 6))
    );
  };

  //formating chart dataSet
  const formatChartDataset = () => {
    props.flightData.forEach((item, index) => {
      let absoluteAltitude = parseInt(item.slice(29, 34));

      let currentTimeInSecs = timeInSecs(item.slice(0, 6));

      if (index === 0) {
        startTime = currentTimeInSecs;
      }
      let currentTimeDiff = currentTimeInSecs - startTime;

      //converting to minutes
      let chartRecord = {
        x: Math.round((currentTimeDiff / 60) * 10) / 10,
        y: absoluteAltitude,
      };
      chartData.push(chartRecord);
    });
    setChartDataset(chartData);
  };

  //chart object
  const [chart, setChart] = useState({
    data: {
      datasets: [
        {
          data: chartDataset,
          showLine: true,
          borderColor: lineColor,

          pointBackgroundColor: "lightblue",
          pointRadius: 0,
          pointHitRadius: 5,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Wysokość npm podczas lotu",
      },
      legend: {
        display: false,
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              labelString: "Wysokość (m)",
              display: true,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              labelString: "Czas lotu (min)",
              display: true,
            },
          },
        ],
      },
    },
  });

  //update chart
  useEffect(() => {
    setChart((prevState) => ({
      ...prevState,
      data: {
        datasets: [
          {
            data: chartDataset,
            showLine: true,
            borderColor: lineColor,

            pointBackgroundColor: "lightblue",
            pointRadius: 0,
            pointHitRadius: 5,
          },
        ],
      },
    }));
  }, [chartDataset]);

  return (
    <div className="graphInner" style={graphStyles}>
      <Scatter data={chart.data} options={chart.options} />
    </div>
  );
};

export default Graph;
