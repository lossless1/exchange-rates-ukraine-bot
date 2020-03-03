const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram');
const { TOKEN } = require('./config/env');
const DynamoDatabase = require('./utils/aws/dynamo');
const FinanceApi = require('./utils/api/FinanceApi');
//251408559 user
//978534005 bot
class TelegramExecutor extends DynamoDatabase {
  async execute() {
    console.log('Starting');
    console.log(TOKEN);
    const bot = new Telegraf(TOKEN);
    const telegram = new Telegram(TOKEN);
    console.log(await telegram.getChatMembersCount(978534005));
    // await telegram.sendMessage(251408559, 'Hello');
    bot.start(async ctx => {
      console.log(ctx);
      ctx.telegram.setChatPermissions(ctx.botInfo.id, {
        can_send_messages: true
      });
      ctx.reply('Welcome to exchange bot!');
    });

    bot.help(ctx => ctx.reply('Send me a sticker'));
    bot.on('sticker', ctx => ctx.reply('👍'));
    bot.command('showratesminfin', async ctx => {
      const financeData = await FinanceApi.get();
      const banks = ['ПриватБанк', 'Укрсиббанк'];
      const currencyIgnore = ['RUB'];

      const findedBanks = financeData.organizations.reduce((acc, val) => {
        if (banks.includes(val.title)) {
          return [...acc, val];
        }
        return [...acc];
      }, []);

      const template = findedBanks
        .map(bank => {
          console.log(bank);
          const firstLine = `${bank.title}: \n`;
          const nextLines = Object.keys(bank.currencies).reduce((acc, key) => {
            const currency = bank.currencies[key];
            if (currencyIgnore.includes(key)) {
              return [...acc];
            }
            return [
              ...acc,
              `${key}: ${parseInt(currency.ask).toFixed(2)}/${parseInt(
                currency.bid
              ).toFixed(2)}`
            ];
          }, []);
          return firstLine + nextLines.join('\n');
        })
        .join('\n\n');
      // return ctx.telegram.sendMessage(251408559, template);
      return ctx.reply(template);
    });
    // console.log(bot.getMe());
    bot.command('showratesfinance', ctx => {
      console.log(123123);
      return ctx.reply('Hello');
    });
    bot.launch();
  }
}

module.exports = TelegramExecutor;
