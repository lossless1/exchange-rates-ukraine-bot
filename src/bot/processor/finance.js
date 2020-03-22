const FinanceApi = require('../../api/FinanceApi');
const FinanceModel = require('../../models/Finance');
const { prepareRate } = require('../../utils/data');
const { RUB } = require('../../constants/rates');

const generateMessageTemplate = (
  organizations,
  chosedBanks,
  ignoreRates = [RUB],
) => {
  const findedBanks = organizations.reduce((acc, val) => {
    if (chosedBanks.includes(val.id)) {
      return [...acc, val];
    }
    return [...acc];
  }, []);
  const preparedTemplate = findedBanks
    .map(bank => {
      const firstLine = `${bank.title}: \n`;
      const nextLines = Object.keys(bank.currencies).reduce((acc, key) => {
        const currency = bank.currencies[key];
        if (ignoreRates.includes(key)) {
          return [...acc];
        }
        return [
          ...acc,
          `${key}: ${prepareRate(currency.ask)}/${prepareRate(currency.bid)}`,
        ];
      }, []);
      return firstLine + nextLines.join('\n');
    })
    .join('\n\n');
  return preparedTemplate.length ? preparedTemplate : 'No one banks found!';
};

const getAndSaveFinanceData = async () => {
  const financeApi = new FinanceApi();
  const data = await financeApi.getData();
  await FinanceModel.save(data);
};

module.exports = { getAndSaveFinanceData, generateMessageTemplate };
