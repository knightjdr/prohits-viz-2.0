import { createSelector } from 'reselect';

const getNewsPage = state => state.newsPage;

const GetNewsPage = createSelector(
  [getNewsPage],
  newsPage => (
    newsPage
  ),
);
export default GetNewsPage;
