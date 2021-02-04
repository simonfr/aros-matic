var CronJob = require('cron').CronJob;

const cron = "* * * * *"

function startCron() {
    var job = new CronJob(cron, function () {



    }, null, true, 'Europe/Paris');

    job.start();
}

module.exports = startCron