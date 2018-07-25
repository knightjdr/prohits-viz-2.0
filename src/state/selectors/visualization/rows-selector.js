import { createSelector } from 'reselect';

const getRows = state => state.rows.list;

const GetRows = createSelector(
  [getRows],
  rows => (
    rows
  ),
);
export default GetRows;
