const { configure, getLogger } = require('log4js');

configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});

const logger = getLogger('Exchange rate');

module.exports = { logger };
