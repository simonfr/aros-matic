var express = require('express');
var app = express();
var startCron = require("./cron.js")
var cors = require('cors')
app.use(cors())
app.get('/stats', function(req, res) {
    res.send(JSON.stringify([
        {
            time: "2021-01-26T13:00:50.081Z",
            luminosity: 652,
            humidity: 845,
            watering: false,
            lastArrosageDate: "2021-01-15T13:00:50.081Z"
        },
        {
            time: "2021-01-27T13:15:50.081Z",
            luminosity: 187,
            humidity: 259,
            watering: false,
            lastArrosageDate: "2021-01-15T13:00:50.081Z"
        },
        {
            time: "2021-01-28T13:30:50.081Z",
            luminosity: 154,
            humidity: 522,
            watering: false,
            lastArrosageDate: "2021-01-15T13:00:50.081Z"
        },
        {
            time: "2021-01-29T13:45:50.081Z",
            luminosity: 487,
            humidity: 651,
            watering: false,
            lastArrosageDate: "2021-01-15T13:00:50.081Z"
        }
    ]));
});

app.get('/actions', function(req, res) {
    res.send('hello world');
});

app.get('/conditions', function(req, res) {
    
    res.send('hello world');
});

startCron()
app.listen(process.env.PORT || 8000);