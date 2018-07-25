import { createSelector } from 'reselect';

const getRowNames = state => state.rows.list.map(row => row.name);

const GetRowNames = createSelector(
  [getRowNames],
  rowNames => (
    rowNames
  ),
);

export default GetRowNames;
