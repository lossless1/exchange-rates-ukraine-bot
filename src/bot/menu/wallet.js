const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const UserModel = require('../../models/Users');

module.exports = bot => {
  bot.hears('💸 Wallet', async ctx => {
    const userModel = new UserModel();
    const user = await userModel.get(ctx.state.userId);
    return ctx.replyWithHTML(
      `Your balance: \nUSD: <b>${user.wallet.balance}</b>\n<i>Please choose action!</i>`,
      Extra.HTML().markup(
        Markup.inlineKeyboard([
          Markup.callbackButton('Top up', 'topup:wallet'),
          Markup.callbackButton('Top down', 'topdown:wallet'),
        ]),
      ),
    );
  });
  bot.action('topup:wallet', async ctx => {
    await ctx.answerCbQuery();
    ctx.session.triggers = { topup: true };
    return ctx.reply('Please type on which count you want to top up!');
  });

  bot.action('topdown:wallet', async ctx => {
    await ctx.answerCbQuery();
    ctx.session.triggers = { topdown: true };
    return ctx.reply('Please type on which count you want to top down!');
  });
};
