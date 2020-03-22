const { chooseExistedProviders } = require('../processor/providers');
const { generateMessageTemplate } = require('../processor/finance');
const FinanceModel = require('../../models/Finance');
const UserModel = require('../../models/Users');
const { getCallbackUserId } = require('../utils/common');

module.exports = bot => {
  const financeModel = new FinanceModel();
  const userModel = new UserModel();

  bot.hears('💸 Rates', async ctx =>
    chooseExistedProviders(ctx, 'Choose what rates you need?', 'rates'),
  );
  bot.action('finance:rates', async ctx => {
    const finance = await financeModel.getLatest();
    const user = await userModel.get(getCallbackUserId(ctx));
    const financeSubscriptionBanks = user.subscriptions.finance.banks;
    if (financeSubscriptionBanks.length) {
      const template = generateMessageTemplate(
        finance.organizations,
        financeSubscriptionBanks,
      );
      return ctx.reply(template);
    }
    return ctx.reply(
      'Please choose any banks in "Banks" in current "Finance" provider to show any banks!',
    );
  });
  bot.action('minfin:rates', ctx => {});
};
