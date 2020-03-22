const BaseModel = require('./Base');
const { EXCHANGE_RATES_FINANCE_UA } = require('../constants/models');

class FinanceModel extends BaseModel {
  constructor() {
    super({ name: EXCHANGE_RATES_FINANCE_UA });
  }
}
module.exports = FinanceModel;
