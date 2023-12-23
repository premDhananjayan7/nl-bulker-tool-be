const cron = require('node-cron');
const { fetchAndUpdateToken } = require('./tokenFetcher');

const runCronJob = () => {
  // Schedule the cron job to run every day at 4:00 A.M.
  cron.schedule('0 0 * * *', async () => {
    console.log('Cron job started at', new Date().toLocaleTimeString());

    try {
      // Run the script to fetch and update the token
      await fetchAndUpdateToken();
      console.log('Cron job completed successfully at', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Cron job failed:', error);
    }
  });
};

module.exports = { runCronJob };
