const cron = require('cron');
const https = require('https');

const backendUrl = 'https://careerhub-l7oq.onrender.com';

const job = new cron.CronJob('*/14 * * * *', function() {
    console.log('Restarting the server');

    https.get(backendUrl, (res) => {
        if (res.statusCode === 200) {
            console.log('Server Restarted');
        } else {
            console.error(`Failed to restart server; Status code: ${res.statusCode}`);
        }
    }).on('error', (err) => {
        console.error('Error:', err.message);
    });
});

module.exports = {
    start: () => job.start()
};
