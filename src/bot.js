const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const session = require('telegraf/session');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const { TOKEN } = require('./config/env');
const DynamoDatabase = require('./utils/aws/dynamo');
const FinanceApi = require('./api/FinanceApi');
//251408559 user
//978534005 bot

class TelegramExecutor extends DynamoDatabase {
  async execute() {
    const bot = new Telegraf(TOKEN);
    // console.log(await this.putItem());
    console.log('Started!');

    // bot.use(session());
    // bot.use(Telegraf.log());
    // bot.use((ctx, next) => {
    // ctx.state.text = ctx.message.text;
    //   return next();
    // });
    bot.start(async ctx => {
      ctx.reply('Welcome to exchange bot!');
    });
    bot.help(ctx => ctx.reply('Send me a sticker'));
    bot.on('sticker', ctx => ctx.reply('👍'));
    bot.command('showratesfinance', async ctx => {
      const financeApi = new FinanceApi();
      await financeApi.getData();
      const template = financeApi.generateMessageTemplate();
      // console.log(ctx.state);
      ctx.session.counter = ctx.session.counter || 0;
      ctx.session.counter++;
      console.log(ctx.session.counter);
      // return ctx.reply(
      //   template,
      // );
      // return ctx.reply(
      //   template,
      //   Markup.keyboard([
      //     'Every 6 hours',
      //     'Every 12 hours',
      //     'Every day',
      //     'Every 2 days'
      //   ])
      //     .oneTime()
      //     .resize()
      //     .extra()
      // );
      return ctx.reply(template);
    });
    bot.command('showratesminfin', async ctx => {
      console.log(ctx.message);
      const data = {
        ...ctx.message.from,
        chatId: ctx.message.chat.id,
        date: ctx.message.date,
        text: ctx.message.text
      };
      await this.putItem(data);

      // ctx.state = { A: 2 };
      // console.log(ctx.state);
      // console.log(123123);
      console.log(ctx.session);

      return ctx.reply('Rates from minfin');
    });
    bot.on('text', async ctx => {
      const data = {
        ...ctx.message.from,
        chatId: ctx.message.chat.id,
        date: ctx.message.date,
        text: ctx.message.text
      };
      await this.putItem(data);
      return ctx.reply(ctx.message.text);
    });
    bot.launch();
  }
}

module.exports = TelegramExecutor;
