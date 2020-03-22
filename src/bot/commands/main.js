const FinanceApi = require('../../api/FinanceApi');
const FinanceModel = require('../../models/Finance');
const { generateMessageTemplate } = require('../processor/finance');

const mainCommands = bot => {
  bot.command('showratesfinance', async ctx => {
    const financeApi = new FinanceApi();
    const data = await financeApi.getData();
    const financeModel = new FinanceModel();
    await financeModel.save(data);
    const template = generateMessageTemplate(data.organizations);
    return ctx.reply(template);
  });

  bot.command('showratesminfin', async ctx =>
    ctx.reply('Rates from minfin currently unavailable'),
  );
};
module.exports = mainCommands;
