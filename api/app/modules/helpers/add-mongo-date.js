const IdToDate = require('./id-to-date');

// adds ISO date to an array of mongo documents based on the _id field
const AddMongoDate = (arr) => {
  if (Array.isArray(arr)) {
    return arr.map((obj) => {
      if (typeof obj === 'object') {
        return Object.assign(
          {},
          obj,
          {
            dbDate: obj._id ? IdToDate(obj._id) : null,
          },
        );
      }
      return obj;
    });
  }
  return arr;
};
module.exports = AddMongoDate;
