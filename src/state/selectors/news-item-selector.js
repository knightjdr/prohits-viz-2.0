import { createSelector } from 'reselect';

import convertIsoDate from '../../helpers/convert-iso-date';

const getNewsItem = state => state.newsItem;

export const addDateIfNotNull = item => (
  item ? convertIsoDate(item.dbDate) : null
);

const GetNewsItem = createSelector(
  [getNewsItem],
  newsItem => ({
    ...newsItem,
    item: {
      ...newsItem.item,
      date: addDateIfNotNull(newsItem.item),
    },
  }),
);
export default GetNewsItem;
