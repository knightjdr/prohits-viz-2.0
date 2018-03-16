const { ObjectID } = require('mongodb');

const AddMongoDate = require('../helpers/add-mongo-date');
const Find = require('../db-methods/find');
const FindOne = require('../db-methods/find-one');

// grabs the news and spotlight items for the home page
const News = newsId => (
  new Promise((resolve) => {
    if (newsId) {
      // get all news stories sorted by date
      if (!ObjectID.isValid(newsId)) {
        resolve({
          data: {
            news: null,
          },
          status: 200,
        });
      } else {
        FindOne('news', { _id: ObjectID(newsId) })
          .then((newsItem) => {
            resolve({
              data: {
                news: AddMongoDate.obj(newsItem),
              },
              status: 200,
            });
          })
          .catch(() => {
            resolve({
              data: {
                news: null,
              },
              status: 200,
            });
          });
      }
    } else {
      // get all news stories sorted by date
      Find('news', {}, {}, { _id: -1 })
        .then((news) => {
          resolve({
            data: {
              news: AddMongoDate.arr(news),
            },
            status: 200,
          });
        })
        .catch(() => {
          resolve({
            data: {
              news: null,
            },
            status: 200,
          });
        });
    }
  })
);
module.exports = News;
