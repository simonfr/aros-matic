var express = require('express');
var app = express();
var startCron = require("./cron.js")
var startSerial = require("./serial.js")
const sqlite3 = require('sqlite3');
var fs = require('fs')
let db = new sqlite3.Database('../db.sqlite');
var cors = require('cors')
app.use(cors())


app.get('/stats', function(req, res) {
    db.all("SELECT * FROM measures", [], (err, rows) => {
        if (err) {
            throw err;
        }

        res.send(JSON.stringify(rows));
    });
});

app.get('/actions', function(req, res) {
    res.send('hello world');
});

app.post('/actions', function (req, res) {
    const data = req.json()
    fs.writeFile('action.json', data, 'utf8', () => {});
});

startCron()
startSerial()
app.listen(process.env.PORT || 8080);