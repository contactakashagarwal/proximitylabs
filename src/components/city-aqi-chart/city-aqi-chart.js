import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { chartOptions } from './chart-config';
import { clone } from 'lodash';

const CityAqiChart = ({ cityName, dataPoints }) => {

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    generateChartData();
  }, [dataPoints[dataPoints.length - 1]]);

  function generateChartData() {
    let seriesData = [];
    const timestamps = dataPoints.map(dp => dp.timestamp);
    const minTimeStamp = Math.min(...timestamps);
    const op = clone(chartOptions(cityName, minTimeStamp));

    seriesData = dataPoints.map(x => [x.timestamp, x.aqi]);
    op.series = [{ data: seriesData }];
    setSeries([{ data: seriesData }]);
    setOptions(op);
  }

  return (
    <div id="chart">
      <ReactApexChart series={series} options={options} type="area" height={350} />
    </div>
  );
}

export default CityAqiChart;

