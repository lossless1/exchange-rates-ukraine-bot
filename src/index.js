const got = require('got');
const AWS = require('aws-sdk');
const TelegramExecutor = require('./bot');

(async () => {
  // console.log(
  //   await got
  //     .get("http://resources.finance.ua/ru/public/currency-cash.json")
  //     .json()
  // );
  console.log(123);
  const botInstance = new TelegramExecutor();
  console.log(await botInstance.listTables());
  await botInstance.execute();
  // console.log(listTables);
})();
// var credentials = new AWS.SharedIniFileCredentials({ profile: "work-account" });
// AWS.config.credentials = credentials;
