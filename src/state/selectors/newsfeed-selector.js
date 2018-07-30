import { createSelector } from 'reselect';

import ConvertIsoDate from '../../helpers/convert-iso-date';

const getNewsfeed = state => state.home.news;

const GetNewsfeedWithDate = createSelector(
  [getNewsfeed],
  newsFeed => (
    newsFeed.map(item => ({
      ...item,
      date: ConvertIsoDate(item.dbDate),
    }))
  ),
);
export default GetNewsfeedWithDate;
