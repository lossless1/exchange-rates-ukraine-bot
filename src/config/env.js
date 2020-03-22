const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  DEBUG: process.env.DEBUG,
  TOKEN: process.env.TOKEN,
  MINFIN_KEY: process.env.MINFIN_KEY,
};
