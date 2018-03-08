const Init = require('./init');

class Database {
  constructor() {
    this.db = Init();
  }
  get connection() {
    return this.db;
  }
}
module.exports = new Database();
