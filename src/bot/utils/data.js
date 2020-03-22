const transformBankData = (bankData, user, provider) => {
  return Object.values(bankData).map(value => ({
    title: value.title,
    id: value.id,
    enabled: user.subscriptions[provider].banks.includes(value.id),
  }));
};

module.exports = { transformBankData };
