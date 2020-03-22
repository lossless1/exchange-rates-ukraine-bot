const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const { getCallbackUserId } = require('../utils/common');
const UserModel = require('../../models/Users');

module.exports = bot => {
  const templateCallbackMessage =
    'Which one provider do you want to have subscriptions?\n<i>Please check provider for schedule!</i>';

  const backButtons = ({ minfin, finance }) =>
    Extra.HTML().markup(
      Markup.inlineKeyboard([
        Markup.callbackButton(
          minfin.enabled ? 'Minfin ✅' : 'Minfin',
          'minfin:provider',
        ),
        Markup.callbackButton(
          finance.enabled ? 'Finance ✅' : 'Finance',
          'finance:provider',
        ),
      ]),
    );

  bot.hears(/(🗄 Providers)|(\/providers)/, async ctx => {
    const userModel = new UserModel();
    const user = await userModel.get(ctx.update.message.from.id);
    return ctx.replyWithHTML(
      templateCallbackMessage,
      backButtons(user.subscriptions),
    );
  });

  bot.action('minfin:provider', async ctx => {
    const userModel = new UserModel();
    const user = await userModel.get(getCallbackUserId(ctx));
    user.subscriptions.minfin.enabled = !user.subscriptions.minfin.enabled;
    await userModel.update(getCallbackUserId(ctx), {
      subscriptions: user.subscriptions,
    });
    await ctx.answerCbQuery('Checked!');
    return ctx.editMessageText(
      templateCallbackMessage,
      backButtons(user.subscriptions),
    );
  });

  bot.action('finance:provider', async ctx => {
    const userModel = new UserModel();
    const user = await userModel.get(getCallbackUserId(ctx));
    user.subscriptions.finance.enabled = !user.subscriptions.finance.enabled;
    await userModel.update(getCallbackUserId(ctx), {
      subscriptions: user.subscriptions,
    });
    await ctx.answerCbQuery('Checked!');
    return ctx.editMessageText(
      templateCallbackMessage,
      backButtons(user.subscriptions),
    );
  });
};
