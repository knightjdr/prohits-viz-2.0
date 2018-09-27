import * as actions from './search-actions';
import * as fileActions from '../interactive-file-actions';
import * as rowActions from './rows-actions';

export const defaultState = {
  columns: {},
  match: false,
  rows: {},
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
      return {
        columns: { ...action.file.search.columns },
        match: action.file.search.match,
        rows: { ...action.file.search.rows },
        searched: action.file.searchsearched,
        term: action.file.searchterm,
      };
    case rowActions.RESTORE_ROWS:
      return defaultState;
    case actions.SET_SEARCH_RESULTS:
      return {
        columns: { ...action.columns },
        match: action.match,
        rows: { ...action.rows },
        searched: true,
        term: action.term,
      };
    case actions.SET_SEARCH_TERM:
      return {
        ...state,
        match: false,
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
