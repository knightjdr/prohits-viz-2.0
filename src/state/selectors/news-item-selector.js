import { createSelector } from 'reselect';

import ConvertIsoDate from '../../helpers/convert-iso-date';

const getNewsItem = state => state.newsItem;

const GetNewsItem = createSelector(
  [getNewsItem],
  newsItem => Object.assign(
    {},
    newsItem,
    {
      item: Object.assign(
        {},
        newsItem.item,
        {
          date: newsItem.item ? ConvertIsoDate(newsItem.item.dbDate) : null,
        },
      ),
    },
  ),
);
export default GetNewsItem;
