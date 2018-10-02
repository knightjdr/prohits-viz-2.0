import { createSelector } from 'reselect';

import convertIsoDate from '../../helpers/convert-iso-date';

const getNewsfeed = state => state.home.news;

const GetNewsfeedWithDate = createSelector(
  [getNewsfeed],
  newsFeed => (
    newsFeed.map(item => ({
      ...item,
      date: convertIsoDate(item.dbDate),
    }))
  ),
);
export default GetNewsfeedWithDate;
