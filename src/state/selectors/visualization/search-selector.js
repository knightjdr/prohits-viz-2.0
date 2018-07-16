import { createSelector } from 'reselect';

const getSearch = state => state.search;

const GetSearch = createSelector(
  [getSearch],
  search => (
    search
  ),
);
export default GetSearch;
