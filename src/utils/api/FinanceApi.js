const got = require('got');

class FinanceApi {
  static async get() {
    return got
      .get('http://resources.finance.ua/ru/public/currency-cash.json')
      .json();
  }
}

module.exports = FinanceApi;
