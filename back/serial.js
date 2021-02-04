const SerialPort = require('serialport')
const sqlite3 = require('sqlite3');
const Readline = require('@serialport/parser-readline')
let db = new sqlite3.Database('../db.sqlite');
var fs = require('fs')

function startSerial() {
    const port = new SerialPort('/dev/cu.usbserial-0001', {
        baudRate: 9600
    })
    const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

    parser.on('data', function (data) {
        const dataSerial = JSON.parse(data.toString('utf8'))

        fs.readFile('action.json', function read(err, data) {
            if (err) {
                throw err;
            }

            const action = JSON.parse(data)

            db.run(`INSERT INTO measures(date, temp, humidity, luminosity)
                VALUES (?, ?, ?, ?)`, [new Date(), dataSerial.temperature, dataSerial.humidity, dataSerial.luminosity], function (err) {
                if (err) {
                    return console.log(err.message);
                }
            });

            console.log(action.days.includes(new Date().getDay()))
            console.log(action.arroserHumidite)
            console.log(dataSerial.humidity)

            if (action.days.includes(new Date().getDay()) && action.arroserHumidite && dataSerial.humidity < 400) {
                port.write('1')
                setTimeout(function() {
                    port.write('0')
                }, data.volume*1000);
            }

        });
    })
}

module.exports = startSerial