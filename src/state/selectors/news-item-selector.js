import { createSelector } from 'reselect';

import ConvertIsoDate from '../../helpers/convert-iso-date';

const getNewsItem = state => state.newsItem;

export const addDateIfNotNull = item => (
  item ? ConvertIsoDate(item.dbDate) : null
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
