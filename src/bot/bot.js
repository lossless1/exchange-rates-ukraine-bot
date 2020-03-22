const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const { isEmpty } = require('lodash');
const { TOKEN } = require('../config/env');
const UsersModel = require('../models/Users');
const addMenus = require('./utils/addMenus');
const addMainCommands = require('./commands/main');
const applyMiddlewares = require('./utils/middlewares');
const UserModel = require('../models/Users');

const execute = () => {
  const bot = new Telegraf(TOKEN);
  applyMiddlewares(bot);
  bot.start(async ctx => {
    const usersModel = new UsersModel();
    const model = {
      ...ctx.message.from,
      message_id: ctx.message.message_id,
      date: ctx.message.date,
    };
    await usersModel.save(`${ctx.message.from.id}`, model);
    return ctx.reply(
      'Welcome to exchange rates bot!',
      Markup.keyboard([
        ['🗄 Providers', '🏦 Banks', '⏰ Schedule time', '💸 Rates'],
        ['⚙️ Setting', '💸 Wallet', '🤑 Donation'],
      ])
        .oneTime()
        .resize()
        .extra(),
    );
  });

  addMenus(bot);
  addMainCommands(bot);

  bot.hears(/\d+/, async ctx => {
    const textMessage = +ctx.message.text;
    let templateCallbackMessage;

    if (!isEmpty(ctx.session.triggers)) {
      const userModel = new UserModel();
      const user = await userModel.get(ctx.state.userId);
      const { balance } = user.wallet;
      if (ctx.session.triggers.topup) {
        const result = balance + textMessage;
        await userModel.update(ctx.state.userId, {
          wallet: { balance: result },
        });
        templateCallbackMessage = `Your balance topped up by <b>${textMessage}$</b>\nCurrent balance: <b>${result}$</b>`;
      }
      if (ctx.session.triggers.topdown) {
        const result = balance - textMessage;
        await userModel.update(ctx.state.userId, {
          wallet: { balance: result },
        });
        templateCallbackMessage = `Your balance topped down by <b>${textMessage}$</b>\nCurrent balance: <b>${result}$</b>`;
      }
      ctx.session.triggers = {};
      return ctx.replyWithHTML(templateCallbackMessage);
    }
    return ctx.reply('Some wrong action! Please write something else.');
  });

  bot.help(ctx =>
    ctx.reply(
      'Welcome to exchange rates bot!',
      Markup.keyboard([
        ['⏰ Schedule', '🏦 Banks'],
        ['⚙️ Setting', '💸 Wallet'],
        ['⭐️ Rate us', '🤑 Donation'],
      ])
        .oneTime()
        .resize()
        .extra(),
    ),
  );

  bot.on('text', async ctx =>
    ctx.reply('Some wrong action! Please write something else.'),
  );

  bot.launch();
};

module.exports = { execute };
