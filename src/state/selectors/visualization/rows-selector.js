import { createSelector } from 'reselect';

const getRows = state => state.rows;

const GetRows = createSelector(
  [getRows],
  rows => (
    rows
  ),
);
export default GetRows;
