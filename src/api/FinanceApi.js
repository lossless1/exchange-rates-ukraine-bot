const Http = require('../utils/http');

class FinanceApi {
  generateMessageTemplate() {
    const banks = ['ПриватБанк', 'Укрсиббанк'];
    const currencyIgnore = ['RUB'];

    const findedBanks = this.data.organizations.reduce((acc, val) => {
      if (banks.includes(val.title)) {
        return [...acc, val];
      }
      return [...acc];
    }, []);

    return findedBanks
      .map(bank => {
        const firstLine = `${bank.title}: \n`;
        const nextLines = Object.keys(bank.currencies).reduce((acc, key) => {
          const currency = bank.currencies[key];
          if (currencyIgnore.includes(key)) {
            return [...acc];
          }
          return [
            ...acc,
            `${key}: ${parseInt(currency.ask).toFixed(2)}/${parseInt(
              currency.bid
            ).toFixed(2)}`
          ];
        }, []);
        return firstLine + nextLines.join('\n');
      })
      .join('\n\n');
  }

  async getData() {
    this.data = await Http.get(
      'http://resources.finance.ua/ru/public/currency-cash.json'
    );
    return this.data;
  }
}

module.exports = FinanceApi;
