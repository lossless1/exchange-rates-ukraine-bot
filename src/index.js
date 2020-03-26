const { execute } = require('./bot/bot');
const RatesScheduller = require('./utils/scheduler/RatesScheduler');

const start = async () => {
  execute();
  RatesScheduller.scheduleFinanceJob();
  // RatesScheduller.scheduleMinfinJob();
};
start()
  .then(() => console.log('Telegram bot started!'))
  .catch(e => {
    // console.error(e);
  });

console.log('test');
