import { defaultState } from '../../state/set/visualization/search-reducer';

const fillSearch = (userSearch = {}) => {
  const search = {};

  const {
    columns,
    columnsCustomize,
    match,
    matchCustomize,
    rows,
    rowsCustomize,
    searched,
    term,
  } = userSearch;

  search.columns = Object.prototype.toString.call(columns) === '[object Object]' ?
    columns
    : defaultState.columns;
  search.columnsCustomize = Object.prototype.toString.call(columnsCustomize) === '[object Object]' ?
    columnsCustomize
    : defaultState.columnsCustomize;
  search.match = typeof match === 'boolean' ? match : defaultState.match;
  search.matchCustomize = typeof matchCustomize === 'boolean' ? matchCustomize : defaultState.matchCustomize;
  search.rows = Object.prototype.toString.call(rows) === '[object Object]' ?
    rows
    : defaultState.rows;
  search.rowsCustomize = Object.prototype.toString.call(rowsCustomize) === '[object Object]' ?
    rowsCustomize
    : defaultState.rowsCustomize;
  search.searched = typeof searched === 'boolean' ? searched : defaultState.searched;
  search.term = typeof term === 'string' ? term : defaultState.term;

  return search;
};

export default fillSearch;
