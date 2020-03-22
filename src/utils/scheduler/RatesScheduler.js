const MinfinApi = require('../../api/MinfinApi');
const FinanceApi = require('../../api/FinanceApi');
const MinfinModel = require('../../models/Minfin');
const FinanceModel = require('../../models/Finance');
const { logger } = require('../../bot/utils/middlewares/logger/log4js');
const { HALF_DAY, DAY } = require('../../constants/timer');

class RatesScheduller {
  static scheduleFinanceJob() {
    setInterval(async () => {
      logger.info('Saving finance data');
      const financeInstance = new FinanceApi();
      const data = await financeInstance.getData();
      await FinanceModel.save(data);
    }, HALF_DAY);
  }

  static scheduleMinfinJob() {
    setInterval(async () => {
      logger.info('Saving minfin data');
      const minfinApi = new MinfinApi();
      const data = await minfinApi.getData();
      await MinfinModel.save(data);
    }, DAY);
  }
}

module.exports = RatesScheduller;
