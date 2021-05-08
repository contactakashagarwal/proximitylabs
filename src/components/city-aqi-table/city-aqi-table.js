import { useEffect, useState } from 'react'
import { clone } from 'lodash';
import { Table, Card, CardTitle, CardBody, CardImg, Spinner, Row, Col } from 'reactstrap'
import './city-aqi-table.css';
import guideImg from '../../images/guide.JPG';
import DataPoint from '../../shared/models/datapoint';
import CityRowData from '../../shared/models/city-row-data';
import { numToFixedDecimal } from '../../shared/utility';

const CityAqiTable = ({ citiesData, selectedCityRowData, onRowSelect }) => {

  const [citiesTable, setCitiesTable] = useState([]);
  const dataHistoryLimit = 20;

  useEffect(() => {
    updateCityAqiTable();
  }, [citiesData]);

  const updateCityAqiTable = () => {
    let citiesTable_clone = clone(citiesTable);

    citiesData.forEach(({ city, aqi }) => {
      //formatting aqi to 2 decimal places
      const aqiVal = numToFixedDecimal(parseFloat(aqi), 2);
      const currTimeStamp = new Date().getTime();
      const dataPoint = new DataPoint(currTimeStamp, aqiVal);
      const currCityRowData = citiesTable_clone.filter(data => data.cityName.toLowerCase() === city.toLowerCase())[0];

      /*if data for curr city exists in table then append
       the datapoint value else add currCity row data in table*/
      if (currCityRowData) {
        //maintaining max history upto a certain limit
        //once limit is reached then remove oldest data point(0th pos) and add new data point in the end
        const currCityDataPoints = currCityRowData.dataPoints;
        if (currCityDataPoints.length >= dataHistoryLimit) {
          currCityDataPoints.shift();
        }
        currCityDataPoints.push(dataPoint);
      } else {
        const cityData = new CityRowData(city, [dataPoint])
        citiesTable_clone.push(cityData)
      }
    });

    //updating last update status for all cities
    citiesTable_clone.forEach(cityData => {
      cityData.lastUpdateStatus = getlastUpdateStatus(cityData.dataPoints[cityData.dataPoints.length - 1].timestamp);
    });

    setCitiesTable(citiesTable_clone);
  }

  const getAqiCategoryClass = (aqiValue) => {
    let defaultclass = 'aqi';
    //doing this to handle aqi values that are between 50 to 51, 100 to 101, 200 to 201 and so on. 
    aqiValue = Math.floor(aqiValue);

    if (aqiValue >= 0 && aqiValue <= 50) {
      defaultclass = defaultclass + ' good';
    } else if (aqiValue >= 51 && aqiValue <= 100) {
      defaultclass = defaultclass + ' satisfactory';
    } else if (aqiValue >= 101 && aqiValue <= 200) {
      defaultclass = defaultclass + ' moderate';
    } else if (aqiValue >= 201 && aqiValue <= 300) {
      defaultclass = defaultclass + ' poor';
    } else if (aqiValue >= 301 && aqiValue <= 400) {
      defaultclass = defaultclass + ' verypoor';
    } else if (aqiValue >= 401 && aqiValue <= 500) {
      defaultclass = defaultclass + ' severe';
    }
    return defaultclass;
  }

  const getlastUpdateStatus = (lastUpdatedTime) => {
    const lastUpdatedDate = new Date(lastUpdatedTime);
    const currDate = new Date();
    const timeDiff = (currDate.getTime() - lastUpdatedDate.getTime()) / 1000; //seconds
    if (timeDiff < 1) {
      return 'few milliseconds ago';
    } else {
      return `${Math.floor(timeDiff)} seconds ago`
    }
  }

  return (
    <div>
      <h2 tag="h5" className="margin50">Air Quality Index</h2>
      <Row className="margin50">
        <Col>
          <div className="text-center aqitable">
            <Table bordered>
              <thead>
                <tr style={{ display: 'fixed' }}>
                  <th>#</th>
                  <th>City</th>
                  <th>Current AQI</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {citiesTable.map((cityRowData, i) =>
                  <tr key={cityRowData.cityName}
                    className={selectedCityRowData && selectedCityRowData.cityName === cityRowData.cityName ? 'selected' : ''}
                    onClick={() => onRowSelect(cityRowData)}>
                    <th scope="row">{i + 1}</th>
                    <td>{cityRowData.cityName}</td>
                    <td className={getAqiCategoryClass(cityRowData.dataPoints.slice(-1)[0].aqi)}>
                      {cityRowData.dataPoints.slice(-1)[0].aqi}
                    </td>
                    <td>{cityRowData.lastUpdateStatus}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div >
        </Col>
        <Col className="guideImgCol">
          <Card >
            <CardBody>
              <CardTitle tag="h5">Guide To Air Quality Index</CardTitle>
            </CardBody>
            <CardImg top src={guideImg} alt="AQI Guide" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CityAqiTable;

