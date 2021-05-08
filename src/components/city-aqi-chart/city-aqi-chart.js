import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { chartOptions } from './chart-config';

const CityAqiChart = ({ cityName, dataPoints }) => {

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    regenerateData();
  }, [dataPoints[dataPoints.length - 1]]);

  function regenerateData() {
    let seriesData = [];
    seriesData.push({ name: cityName, data: dataPoints.map(x => x.aqi) });
    setSeries(seriesData);
    setOptions(chartOptions(cityName));
  }

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </div>
  );
}

export default CityAqiChart;

