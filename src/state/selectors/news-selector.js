import { createSelector } from 'reselect';

import ConvertIsoDate from '../../helpers/convert-iso-date';

const getNews = state => state.news;

const GetNews = createSelector(
  [getNews],
  news => ({
    ...news,
    list: news.list.map(item => ({
      ...item,
      date: ConvertIsoDate(item.dbDate),
    })),
  }),
);
export default GetNews;
