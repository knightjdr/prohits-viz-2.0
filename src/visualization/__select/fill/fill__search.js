import { defaultState } from '../../../state/set/visualization/search-reducer';

const fillSearch = (userSearch) => {
  const search = {};

  const {
    columns,
    match,
    rows,
    searched,
    term,
  } = userSearch;

  search.columns = Object.prototype.toString.call(columns) === '[object Object]' ?
    columns
    : defaultState.columns;
  search.match = typeof match === 'boolean' ? match : defaultState.match;
  search.rows = Object.prototype.toString.call(rows) === '[object Object]' ?
    rows
    : defaultState.rows;
  search.searched = typeof searched === 'boolean' ? searched : defaultState.searched;
  search.term = typeof term === 'string' ? term : defaultState.term;

  return search;
};

export default fillSearch;
