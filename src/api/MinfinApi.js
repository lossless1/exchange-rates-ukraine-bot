const Http = require('../utils/http');

class MinfinApi {
  static async get() {
    return Http.get('http://resources.finance.ua/ru/public/currency-cash.json');
  }
}
