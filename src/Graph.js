import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";

const Graph = (props) => {
  let firstRecord = props.flightData[0];
  let lastRecord = props.flightData[props.flightData.length - 1];

  const [chartDataset, setChartDataset] = useState([]);

  const [filteredData, setFilteredData] = useState(
    props.flightData.filter((item, index) => {
      return index % 6 === 0;
    })
  );

  useEffect(() => {
    setFilteredData(
      props.flightData.filter((item, index) => {
        return index % 6 === 0;
      })
    );
  }, [props.flightData]);

  useEffect(() => {
    formatChartDataset();
  }, [filteredData]);

  let startTime;
  let chartData = [];

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
    filteredData.forEach((item, index) => {
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

  const [chart, setChart] = useState({
    data: {
      datasets: [
        {
          data: chartDataset,
          showLine: true,
          borderColor: "rgba(10, 50, 160, 0.8)",

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

  useEffect(() => {
    setChart((prevState) => ({
      ...prevState,
      data: {
        datasets: [
          {
            data: chartDataset,
            showLine: true,
            borderColor: "rgba(10, 50, 160, 0.8)",

            pointBackgroundColor: "lightblue",
            pointRadius: 0,
            pointHitRadius: 5,
          },
        ],
      },
    }));
  }, [chartDataset]);

  return (
    <div className="graph" style={{ position: "relative" }}>
      <Scatter data={chart.data} options={chart.options} />
    </div>
  );
};

export default Graph;
