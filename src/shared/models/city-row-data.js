export default class CityRowData {
    constructor(cityName, dataPoints = []) {
        this.cityName = cityName;
        this.dataPoints = dataPoints;
    }
    cityName;
    dataPoints;
    lastUpdateStatus;
}