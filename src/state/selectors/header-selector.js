import { createSelector } from 'reselect';

const getHeader = state => state.header;

const GetHeader = createSelector(
  [getHeader],
  header => (
    header
  ),
);
export default GetHeader;
