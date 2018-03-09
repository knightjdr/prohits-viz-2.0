const Init = require('./init');
const Logger = require('../../logger');

// initialize database when class is first requried
const Database = {
  connection: null,
  init: () => (
    new Promise((resolve, reject) => {
      Init()
        .then((db) => {
          Database.connection = db;
          resolve();
        })
        .catch((err) => {
          Logger.error(err);
          reject(err);
        });
    })
  ),
};
module.exports = Database;
