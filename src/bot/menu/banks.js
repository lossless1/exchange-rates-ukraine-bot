const Markup = require('telegraf/markup');
const { capitalize } = require('lodash');
const {
  createArray,
  getPattern,
  getCallbackUserId,
} = require('../utils/common');
const { transformBankData } = require('../utils/data');
const UserModel = require('../../models/Users');
const FinanceModel = require('../../models/Finance');
const { chooseExistedProviders } = require('../processor/providers');

module.exports = bot => {
  const templateCallbackMessage =
    'Which one provider do you want to chose banks inside?\n';
  const financeModel = new FinanceModel();
  const userModel = new UserModel();

  bot.hears(/(🏦 Banks)|(\/banks)/, async ctx =>
    chooseExistedProviders(ctx, templateCallbackMessage, 'provider:banks'),
  );

  const renderColumnButton = (
    data,
    provider,
    index,
    columns,
    menuPrefix = 'banks',
    customPrefix = 'bank_name',
  ) =>
    data
      .slice(index * columns, index * columns + columns)
      .map(({ title, id, enabled }) =>
        Markup.callbackButton(
          `${capitalize(title)}${enabled ? ' ✅' : ''}`,
          `${id}:${provider}:${menuPrefix}:${customPrefix}`,
        ),
      );

  const createInlineButtonsColumns = (
    bankData,
    provider = 'finance',
    page = 1,
    pageNumMaxElem = 20,
    columns = 2,
  ) => {
    if (pageNumMaxElem > 20) {
      throw new Error('Too much elements in list');
    }
    const pagesQuantity = Math.ceil(bankData.length / pageNumMaxElem);
    const correctLength = Math.ceil(pageNumMaxElem / columns);
    const realPage = page - 1;
    return createArray(correctLength).reduce((acc, value, index, array) => {
      const realBankData = bankData.slice(
        realPage * pageNumMaxElem,
        realPage * pageNumMaxElem + pageNumMaxElem,
      );
      if (index === 0 && page > 1) {
        acc.push([
          Markup.callbackButton('Prev ⬅️', `prev:${provider}:provider:banks`),
        ]);
      }
      if (index + 1 === array.length && pagesQuantity !== page) {
        return [
          ...acc,
          renderColumnButton(realBankData, provider, index, columns),
          [Markup.callbackButton('Next ➡️', `next:${provider}:provider:banks`)],
        ];
      }

      return [
        ...acc,
        renderColumnButton(realBankData, provider, index, columns),
      ];
    }, []);
  };

  bot.action('finance:provider:banks', async ctx => {
    const finance = await financeModel.getLatest();
    const [provider] = ctx.match.split(':');
    const user = await userModel.get(getCallbackUserId(ctx));
    const bankData = transformBankData(finance.organizations, user, provider);
    await ctx.answerCbQuery('Checked!');
    ctx.session.bankPage = 1;
    await ctx.editMessageText(`Please choose banks for ${provider} provider!`);
    return ctx.editMessageReplyMarkup(
      Markup.inlineKeyboard(createInlineButtonsColumns(bankData, provider)),
    );
  });

  bot.action(/(next|prev):[a-zA-Z]+:provider:banks/, async ctx => {
    const finance = await financeModel.getLatest();
    const pattern = getPattern(ctx);
    const actionPattern = pattern[0];
    const provider = pattern[1];
    const user = await userModel.get(getCallbackUserId(ctx));
    const bankData = transformBankData(finance.organizations, user, provider);
    const makeCalc = action => {
      switch (action) {
        case 'prev':
          ctx.session.bankPage--;
          return ctx.session.bankPage;
        case 'next':
          ctx.session.bankPage++;
          return ctx.session.bankPage;
        default:
          ctx.session.bankPage++;
          return ctx.session.bankPage;
      }
    };
    const page = makeCalc(actionPattern);
    await ctx.answerCbQuery(`Going to the ${actionPattern} page!`);
    return ctx.editMessageReplyMarkup(
      Markup.inlineKeyboard(
        createInlineButtonsColumns(bankData, provider, page),
      ),
    );
  });

  bot.action(/:banks:bank_name/, async ctx => {
    const [bankId, provider] = getPattern(ctx);
    const user = await userModel.get(getCallbackUserId(ctx));
    const finance = await financeModel.getLatest();

    if (!user.subscriptions[provider].banks.includes(bankId)) {
      user.subscriptions[provider].banks.push(bankId);
    } else {
      const index = user.subscriptions[provider].banks.findIndex(
        id => id === bankId,
      );
      user.subscriptions[provider].banks.splice(index, 1);
    }
    await userModel.update(getCallbackUserId(ctx), {
      subscriptions: user.subscriptions,
    });
    const bankData = transformBankData(finance.organizations, user, provider);

    await ctx.answerCbQuery('Checked!');
    return ctx.editMessageReplyMarkup(
      Markup.inlineKeyboard(
        createInlineButtonsColumns(bankData, provider, ctx.session.bankPage),
      ),
    );
  });
};
