const Config = require('../../../config');
const Database = require('../../connections/database');

const Query = {
  get: (collection, queryObject = {}, returnObject = {}) => (
    new Promise((resolve, reject) => {
      const db = Database.connection;
      db.collection(`${Config.database.prefix}${collection}`)
        .find(queryObject, { projection: returnObject })
        .toArray()
        .then((documents) => {
          resolve(documents);
        })
        .catch((err) => {
          reject(err);
        });
    })
  ),
};
module.exports = Query;
