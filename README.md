# Air Quality Index Monitoring App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
This App is deployed using github pages => [Air Quality Index Monitoring](https://contactakashagarwal.github.io/proximitylabs/)

## Features

1. Read realtime **Air Quality Index (AQI)** data for different cities via Web Socket Connection.
2. Table to show AQI data city wise.
3. Combining the AQI data recieved as individual ws message response for different cities and storing historical data points upto a certain limit.
4. Once we click on any city row, a Timeseries chart will be displayed showing time based AQI data. X Axis => Timestamp , YAxis => AQI value
5. The Chart will also change in realtime and it will keep appending latest data points recieved via web socket.

## Approach

Comments have been added in most of the places in code to make intentions explicit. However below are few points that can be highlighted
- **Throttling the WebSocket onMessage event** such that we don't we can control the frequency of messages recieved from server.
- Merging the city data recieved on every call in local memory such that for each city, an array of limited historical AQI data values are maintained. Current limit is set to 20 Data Points
- Chart will keep on changing in realtime as long as we keep receiving new data from server.

## Application Snapshots
**Starting Page** , Table is loaded based on generated data, Here latest AQI values for each city and their Last Updated Status is shown.
![image](https://user-images.githubusercontent.com/62435205/117538698-00491480-b025-11eb-830e-c58298ccfe7e.png)

**Chart** is Loaded on slecting city
![image](https://user-images.githubusercontent.com/62435205/117538886-751c4e80-b025-11eb-9272-8ea8d8e890cc.png)


## Technology choice

- I am using React Library to build this SPA since I am comfortable using it. 
- For Charts I have used the ReactApexCharts library, since they were simpler to integrate and provide multiple configurable options.
- For sotring the CITY data I have used Array as Datastructure. We could have used dictionary as well such that fetching city data would have been faster but since it was a very small dataset so it won't matter much.
- For Each DataSet I am storing the timestamp and AQI value (upto 2 decimal places), and I am maintaining 20 datapoints for each city in local memory.
- For Last update status I am comparing timestamps and if it is updated withing milliseconds then display message will be "few milliseconds ago" else it will show actual time in seconds.
