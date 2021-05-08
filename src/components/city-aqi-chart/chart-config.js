export const chartOptions = (cityName, minTimeStamp) => {

    return {
        series: [{ data: [] }],
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                autoScaleYaxis: true
            }
        },
        annotations: {
            yaxis: [
                {
                    y: 51,
                    borderColor: '#999',
                    label: {
                        show: true,
                        text: 'Satisfactory',
                        style: {
                            color: "#fff",
                            background: '#00E396'
                        }
                    }
                },
                {
                    y: 101,
                    borderColor: '#999',
                    label: {
                        show: true,
                        text: 'Moderate',
                        style: {
                            color: "#fff",
                            background: '#00E396'
                        }
                    }
                },
                {
                    y: 201,
                    borderColor: '#999',
                    label: {
                        show: true,
                        text: 'Poor',
                        style: {
                            color: "#fff",
                            background: '#00E396'
                        }
                    }
                },
                {
                    y: 301,
                    borderColor: '#999',
                    label: {
                        show: true,
                        text: 'Very Poor',
                        style: {
                            color: "#fff",
                            background: '#00E396'
                        }
                    }
                },
                {
                    y: 401,
                    borderColor: '#999',
                    label: {
                        show: true,
                        text: 'Severe',
                        style: {
                            color: "#fff",
                            background: '#00E396'
                        }
                    }
                }]
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        title: {
            text: `${cityName} Air Quality Index`,
            align: 'center'
        },
        xaxis: {
            type: 'datetime',
            min: minTimeStamp,
            tickAmount: 6,
            labels: {
                formatter: function (val) {
                    return new Date(val).toString().slice(0, 24);
                },
            },
            title: {
                text: 'Timestamp'
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val;
                },
            },
            title: {
                text: 'Air Quality Index'
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    }
};