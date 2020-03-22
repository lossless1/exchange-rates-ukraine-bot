const Http = require('../utils/http');
const { MINFIN_KEY } = require('../config/env');

class MinfinApi {
  async getData() {
    this.data = Http.get(`http://api.minfin.com.ua/mb/${MINFIN_KEY}/`);
    return this.data;
  }
}

module.exports = MinfinApi;
