import { createSelector } from 'reselect';

const getColumns = state => state.columns;

const GetColumns = createSelector(
  [getColumns],
  columns => (
    columns
  ),
);
export default GetColumns;
