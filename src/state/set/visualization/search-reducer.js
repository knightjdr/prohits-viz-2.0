import {
  CLEAR_SEARCH,
  SET_SEARCH_TERM,
} from './search-actions';

const Search = (state = {
  term: '',
}, action) => {
  switch (action.type) {
    case CLEAR_SEARCH:
      return {
        term: '',
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        term: action.term,
      };
    default:
      return state;
  }
};
export default Search;
