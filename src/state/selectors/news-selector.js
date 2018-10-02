import { createSelector } from 'reselect';

import convertIsoDate from '../../helpers/convert-iso-date';

const getNews = state => state.news;

const GetNews = createSelector(
  [getNews],
  news => ({
    ...news,
    list: news.list.map(item => ({
      ...item,
      date: convertIsoDate(item.dbDate),
    })),
  }),
);
export default GetNews;
