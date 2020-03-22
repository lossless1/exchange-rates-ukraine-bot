const { v4: uuid } = require('uuid');
const firestore = require('../utils/firestore');

class BaseModel {
  constructor({ name }) {
    this.name = name;
    this.collection = firestore.collection(this.name);
  }

  async getLatestBankById(id) {
    const latest = await this.getLatest();
    return latest.organizations.find(bank => bank.id === id);
  }

  async getLatest() {
    const data = await this.collection
      .limit(1)
      .orderBy('date', 'desc')
      .get();
    if (!data.size) {
      throw new Error('No such document!');
    } else {
      const result = [];
      data.forEach(value => result.push(value.data()));
      return result[0];
    }
  }

  async getAll() {
    return this.collection.get();
  }

  async get(id) {
    const doc = await this.collection.doc(`${id}`).get();
    if (!doc.exists) {
      throw new Error('No such document!');
    } else {
      return doc.data();
    }
  }

  async update(id, data) {
    return this.collection.doc(`${id}`).update(data);
  }

  async save(data) {
    return this.collection.doc(uuid()).set(data);
  }
}
module.exports = BaseModel;
