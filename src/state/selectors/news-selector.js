import { createSelector } from 'reselect';

import ConvertIsoDate from '../../helpers/convert-iso-date';

const getNews = state => state.news;

const GetNews = createSelector(
  [getNews],
  news => (
    Object.assign(
      {},
      news,
      {
        list: news.list.map(item => (
          Object.assign(
            {},
            item,
            {
              date: ConvertIsoDate(item.dbDate),
            },
          )
        )),
      },
    )
  ),
);
export default GetNews;
