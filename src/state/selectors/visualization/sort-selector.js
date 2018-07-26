import { createSelector } from 'reselect';

const getSort = state => ({
  direction: state.rows.direction,
  id: state.rows.id,
  sortBy: state.rows.sortBy,
});

const GetSort = createSelector(
  [getSort],
  sort => (
    sort
  ),
);
export default GetSort;
