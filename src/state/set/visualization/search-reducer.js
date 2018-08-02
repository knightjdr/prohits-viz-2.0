import * as actions from './search-actions';
import { RESTORE_ROWS, UPDATE_ROWS } from './rows-actions';

const Search = (state = {
  columns: {},
  match: false,
  rows: {},
  searched: false,
  term: '',
}, action) => {
  switch (action.type) {
    case actions.CLEAR_SEARCH:
      return {
        columns: {},
        match: false,
        rows: {},
        searched: false,
        term: '',
      };
    case RESTORE_ROWS:
      return {
        columns: {},
        match: false,
        rows: {},
        searched: false,
        term: '',
      };
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
    case UPDATE_ROWS:
      return {
        columns: {},
        match: false,
        rows: {},
        searched: false,
        term: '',
      };
    default:
      return state;
  }
};
export default Search;
