var CronJob = require('cron').CronJob;

const cron = "*/10 * * * *"

function startCron() {
    var job = new CronJob(cron, function () {
        console.log('You will see this message every second');
    }, null, true, 'Europe/Paris');

    job.start();
}

module.exports = startCron