const BaseModel = require('./Base');
const { USERS } = require('../constants/models');

class UsersModel extends BaseModel {
  constructor() {
    super({ name: USERS });
  }

  async save(id, data) {
    const modData = {
      ...data,
      subscriptions: {
        minfin: { enabled: false, banks: [] },
        finance: { enabled: false, banks: [] },
      },
      wallet: {
        balance: 0,
      },
    };
    return this.collection.doc(id).set(modData);
  }
}
module.exports = UsersModel;
