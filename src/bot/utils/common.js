const { get } = require('lodash');

const getUserId = ctx => get(ctx, 'message.id');

const getCallbackUserId = ctx => get(ctx, 'update.callback_query.from.id');

const getPattern = ctx => get(ctx, 'match.input', '').split(':');

const createArray = num => new Array(num).fill(null);

module.exports = { getUserId, getCallbackUserId, createArray, getPattern };
