const got = require('got');
const AWS = require('aws-sdk');
const TelegramExecutor = require('./bot');

(async () => {
  const botInstance = new TelegramExecutor();
  await botInstance.execute();
})();
