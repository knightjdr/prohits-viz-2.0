import SearchReducer from './search-reducer';
import * as actions from './search-actions';

describe('Search reducer', () => {
  it('should return empty initial state', () => {
    const action = {};
    const expectedState = {
      term: '',
    };
    expect(SearchReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_SEARCH action', () => {
    const action = {
      type: actions.CLEAR_SEARCH,
    };
    const expectedState = {
      term: '',
    };
    expect(SearchReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_SEARCH_TERM action', () => {
    const action = {
      term: 'testTerm',
      type: actions.SET_SEARCH_TERM,
    };
    const expectedState = {
      term: 'testTerm',
    };
    expect(SearchReducer(undefined, action)).toEqual(expectedState);
  });
});
