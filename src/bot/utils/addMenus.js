const fs = require('fs');
const path = require('path');

const MENUS_DIR = path.resolve(__dirname, '../menu');

module.exports = async bot => {
  const data = fs.readdirSync(MENUS_DIR);
  data.forEach(file => {
    try {
      const menu = require(path.resolve(MENUS_DIR, file));
      menu(bot);
    } catch (e) {
      console.error(e);
    }
  });
};
