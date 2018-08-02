import SearchReducer from './search-reducer';
import * as actions from './search-actions';
import { RESTORE_ROWS, UPDATE_ROWS } from './rows-actions';

describe('Search reducer', () => {
  it('should return empty initial state', () => {
    const action = {};
    const expectedState = {
      columns: {},
      match: false,
      rows: {},
      searched: false,
      term: '',
    };
    expect(SearchReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_SEARCH action', () => {
    const action = {
      type: actions.CLEAR_SEARCH,
    };
    const expectedState = {
      columns: {},
      match: false,
      rows: {},
      searched: false,
      term: '',
    };
    expect(SearchReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle RESTORE_ROWS action', () => {
    const action = {
      type: RESTORE_ROWS,
    };
    const expectedState = {
      columns: {},
      match: false,
      rows: {},
      searched: false,
      term: '',
    };
    expect(SearchReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_SEARCH_RESULTS action', () => {
    const action = {
      columns: { a: 1 },
      match: true,
      rows: { b: 1 },
      term: 'testTerm',
      type: actions.SET_SEARCH_RESULTS,
    };
    const expectedState = {
      columns: { a: 1 },
      match: true,
      rows: { b: 1 },
      searched: true,
      term: 'testTerm',
    };
    expect(SearchReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_SEARCH_TERM action', () => {
    const action = {
      term: 'testTerm',
      type: actions.SET_SEARCH_TERM,
    };
    const expectedState = {
      columns: {},
      match: false,
      rows: {},
      searched: false,
      term: 'testTerm',
    };
    expect(SearchReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_ROWS action', () => {
    const action = {
      type: UPDATE_ROWS,
    };
    const expectedState = {
      columns: {},
      match: false,
      rows: {},
      searched: false,
      term: '',
    };
    expect(SearchReducer(undefined, action)).toEqual(expectedState);
  });
});
