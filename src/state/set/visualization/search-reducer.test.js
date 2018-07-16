import SearchReducer from './search-reducer';
import * as actions from './search-actions';

const DefaultState = {
  term: '',
};

describe('Search reducer', () => {
  it('should return empty initial state', () => {
    expect(SearchReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle CLEAR_SEARCH', () => {
    const expectedState = {
      term: '',
    };
    expect(SearchReducer(undefined, {
      type: actions.CLEAR_SEARCH,
    })).toEqual(expectedState);
  });

  it('should handle SET_SEARCH_TERM', () => {
    const expectedState = {
      term: 'testTerm',
    };
    expect(SearchReducer(undefined, {
      term: 'testTerm',
      type: actions.SET_SEARCH_TERM,
    })).toEqual(expectedState);
  });
});
