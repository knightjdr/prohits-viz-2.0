import { createSelector } from 'reselect';

const getHomeLoaded = state => state.home.isLoaded;

const GetLoaded = createSelector(
  [getHomeLoaded],
  isLoaded => (
    isLoaded
  ),
);
export default GetLoaded;
