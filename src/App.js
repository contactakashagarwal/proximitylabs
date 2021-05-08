import { useEffect, useState } from 'react'
import './App.css';
import { throttle, clone } from 'lodash';
import CityAqiTable from './components/city-aqi-table/city-aqi-table';
import CityAqiChart from './components/city-aqi-chart/city-aqi-chart';

function App() {

  const ws = new WebSocket('wss://city-ws.herokuapp.com/')
  const [citiesData, setCitiesData] = useState([]);
  const [selectedCityRowData, setSelectedCityRowData] = useState(null);

  useEffect(() => {
    connect();
  }, [])

  const connect = () => {
    ws.onopen = () => {
      console.log('connected');
    }

    //throttling the onmessage event and updating only once in 2 seconds
    ws.onmessage = throttle(evt => {
      const message = JSON.parse(evt.data);
      setCitiesData(message)
    }, 300)

    ws.onclose = () => {
      console.log('disconnected');
    }
  }

  const onRowSelect = (cityData) => {
    setSelectedCityRowData(clone(cityData));
  }

  return (
    <div className="App">
      <CityAqiTable
        citiesData={citiesData}
        selectedCityRowData={selectedCityRowData}
        onRowSelect={(selectedRowData) => onRowSelect(selectedRowData)} />

      {selectedCityRowData &&
        <div className="chartContainer">
          <CityAqiChart cityName={selectedCityRowData.cityName}
            dataPoints={selectedCityRowData.dataPoints} />
        </div>
      }
    </div>
  );
}

export default App;
