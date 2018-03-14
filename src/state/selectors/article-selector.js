import { createSelector } from 'reselect';

const getSpotlight = state => state.home.spotlight;

const GetArticles = createSelector(
  [getSpotlight],
  articles => (
    articles
  ),
);
export default GetArticles;
