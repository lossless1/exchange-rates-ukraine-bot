const Http = require('../utils/http');
const { FINANCE_API } = require('../constants/api');

class FinanceApi {
  async getData() {
    this.data = await Http.get(FINANCE_API);
    return this.data;
  }
}

module.exports = FinanceApi;
