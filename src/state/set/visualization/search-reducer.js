import * as actions from './search-actions';
import * as fileActions from '../interactive-file-actions';
import * as rowActions from './rows-actions';

export const defaultState = {
  columns: {},
  columnsCustomize: {},
  match: false,
  matchCustomize: false,
  rows: {},
  rowsCustomize: {},
  searched: false,
  term: '',
};

const Search = (state = defaultState, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return defaultState;
    case actions.CLEAR_SEARCH:
      return defaultState;
    case fileActions.PARSE_INTERACTIVE_FILE:
      return action.file.search
        ? {
          columns: { ...action.file.search.columns },
          columnsCustomize: { ...action.file.search.columnsCustomize },
          match: action.file.search.match,
          matchCustomize: action.file.search.matchCustomize,
          rows: { ...action.file.search.rows },
          rowsCustomize: { ...action.file.search.rowsCustomize },
          searched: action.file.search.searched,
          term: action.file.search.term,
        }
        : { ...defaultState };
    case rowActions.RESTORE_ROWS:
      return defaultState;
    case actions.SET_SEARCH_RESULTS:
      return {
        columns: { ...action.columns },
        columnsCustomize: { ...action.columnsCustomize },
        match: action.match,
        matchCustomize: action.matchCustomize,
        rows: { ...action.rows },
        rowsCustomize: { ...action.rowsCustomize },
        searched: true,
        term: action.term,
      };
    case actions.SET_SEARCH_TERM:
      return {
        ...state,
        match: false,
        matchCustomize: false,
        searched: false,
        term: action.term,
      };
    case rowActions.UPDATE_ROWS:
      return defaultState;
    default:
      return state;
  }
};
export default Search;
