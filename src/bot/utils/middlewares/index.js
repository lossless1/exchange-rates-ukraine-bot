const session = require('telegraf/session');
const { get } = require('lodash');
const logger = require('./logger/tlogger');

module.exports = bot => {
  // bot.use(logger());
  bot.use(session());
  bot.use(async (ctx, next) => {
    if (get(ctx, 'message.from.id')) {
      ctx.state.userId = ctx.message.from.id;
    }
    ctx.session.triggers = ctx.session.triggers || {};
    ctx.session.bankPage = ctx.session.bankPage || 1;
    await next();
  });
  bot.catch(ctx => {
    console.error(ctx);
  });
};
