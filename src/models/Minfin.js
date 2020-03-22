const BaseModel = require('./Base');
const { EXCHANGE_RATES_MINFIN } = require('../constants/models');

class MinfinModel extends BaseModel {
  constructor() {
    super({ name: EXCHANGE_RATES_MINFIN });
  }

  async save(data) {
    this.save({ rates: data });
  }
}
module.exports = MinfinModel;
