const Markup = require('telegraf/markup');
const { capitalize } = require('lodash');
const UserModel = require('../../models/Users');

const chooseExistedProviders = async (ctx, callbackMessage, prefix) => {
  const userModel = new UserModel();
  const user = await userModel.get(ctx.update.message.from.id);
  const existedSubscriptions = Object.keys(user.subscriptions).filter(
    key => user.subscriptions[key].enabled,
  );
  if (existedSubscriptions.length) {
    return ctx.reply(
      callbackMessage,
      Markup.inlineKeyboard([
        existedSubscriptions.map(value =>
          Markup.callbackButton(capitalize(value), `${value}:${prefix}`),
        ),
      ]).extra(),
    );
  }
  return ctx.reply(
    'You did not chose any providers! Please go to "🗄 Providers" menu or /providers',
  );
};
module.exports = { chooseExistedProviders };
