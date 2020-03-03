class MinfinApi {
  static async get() {
    await got
      .get('http://resources.finance.ua/ru/public/currency-cash.json')
      .json();
  }
}
