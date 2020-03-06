const got = require('got');

const get = async url => {
  try {
    const response = await got.get(url).json();
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = { get };
