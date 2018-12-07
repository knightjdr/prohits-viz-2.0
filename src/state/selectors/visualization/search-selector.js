import { createSelector } from 'reselect';

const getSearch = (state, type) => {
  const search = {
    searched: state.search.searched,
    term: state.search.term,
  };
  switch (type) {
    case 'all': {
      return state.search;
    }
    case 'customize':
      return {
        ...search,
        columns: state.search.columnsCustomize,
        match: state.search.matchCustomize,
        rows: state.search.rowsCustomize,
      };
    default:
      return {
        ...search,
        columns: state.search.columns,
        match: state.search.match,
        rows: state.search.rows,
      };
  }
};

const GetSearch = createSelector(
  [getSearch],
  search => (
    search
  ),
);
export default GetSearch;
