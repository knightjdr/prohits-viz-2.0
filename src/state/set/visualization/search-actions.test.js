import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './search-actions';

// configure mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Query array', () => {
  it('should reduce an array to an object of keys matching search term', () => {
    const arr = ['a', 'b', 'ba', 'aba'];
    const expectedObj = { a: 1, ba: 1, aba: 1 };
    expect(actions.queryArray(arr, 'a')).toEqual(expectedObj);
  });

  it('should be case insensitive', () => {
    const arr = ['a', 'b', 'ba', 'A'];
    const expectedObj = { a: 1, ba: 1, A: 1 };
    expect(actions.queryArray(arr, 'a')).toEqual(expectedObj);
  });
});

describe('Searching available genes', () => {
  describe('should search when a term is present in state', () => {
    let expectedActions;

    beforeAll(() => {
      const columns = {
        names: ['a', 'b', 'c', 'ab', 'ba'],
      };
      const rows = {
        list: [{ name: 'd' }, { name: 'ea' }, { name: 'f' }],
      };
      const search = {
        term: 'a',
      };
      const store = mockStore({ columns, rows, search });
      store.dispatch(actions.searchGenes());
      expectedActions = store.getActions();
    });

    it('and dispatch a single action', () => {
      expect(expectedActions.length).toBe(1);
    });

    it('and find matches in gene list', () => {
      const columns = { a: 1, ab: 1, ba: 1 };
      const rows = { ea: 1 };
      expect(expectedActions).toContainEqual({
        columns,
        match: true,
        rows,
        term: 'a',
        type: actions.SET_SEARCH_RESULTS,
      });
    });
  });

  describe('should not search when a term is not present in state', () => {
    let expectedActions;

    beforeAll(() => {
      const columns = {
        names: ['a', 'b', 'c', 'ab', 'ba'],
      };
      const rows = {
        list: [{ name: 'd' }, { name: 'ea' }, { name: 'f' }],
      };
      const search = {
        term: '',
      };
      const store = mockStore({ columns, rows, search });
      store.dispatch(actions.searchGenes());
      expectedActions = store.getActions();
    });

    it('and dispatch a single action', () => {
      expect(expectedActions.length).toBe(0);
    });
  });
});

describe('Visualization search set actions', () => {
  it('should dispatch an action to reset search state', () => {
    const expectedAction = {
      type: actions.CLEAR_SEARCH,
    };
    expect(actions.clearSearch()).toEqual(expectedAction);
  });

  it('should dispatch an action to set search state', () => {
    const expectedAction = {
      columns: {},
      match: false,
      rows: {},
      term: 'test',
      type: actions.SET_SEARCH_RESULTS,
    };
    expect(actions.setSearchResults('test', {}, {}, false)).toEqual(expectedAction);
  });

  it('should dispatch an action to set search term', () => {
    const expectedAction = {
      term: 'test',
      type: actions.SET_SEARCH_TERM,
    };
    expect(actions.setSearchTerm('test')).toEqual(expectedAction);
  });
});
