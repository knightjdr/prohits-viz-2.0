import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './search-actions';

// configure mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

describe('Query array', () => {
  it('should reduce an array to an object of keys matching search term', () => {
    const arr = ['a', 'b', 'ba', 'aba'];
    const expectedObj = {
      first: 0,
      matches: { a: 0.13, ba: 0.63, aba: 0.88 },
    };
    expect(actions.queryArray(arr, 'a')).toEqual(expectedObj);
  });

  it('should be case insensitive', () => {
    const arr = ['a', 'b', 'ba', 'A'];
    const expectedObj = {
      first: 0,
      matches: { a: 0.13, ba: 0.63, A: 0.88 },
    };
    expect(actions.queryArray(arr, 'a')).toEqual(expectedObj);
  });

  it('should return null if no match', () => {
    const arr = ['a', 'b', 'ba', 'A'];
    const expectedObj = {
      first: null,
      matches: {},
    };
    expect(actions.queryArray(arr, 'c')).toEqual(expectedObj);
  });
});

describe('New position calculation', () => {
  it('should return input position when matches, i.e. firstCell args, are not numeric', () => {
    const firstCellX = undefined;
    const firstCellY = undefined;
    const dimensions = {
      columns: 50,
      pageX: 25,
      pageY: 25,
      rows: 50,
    };
    const position = { x: 0, y: 0 };
    const expectedObj = { x: 0, y: 0 };
    expect(actions.newPosition(firstCellX, firstCellY, dimensions, position)).toEqual(expectedObj);
  });

  it('should return new position', () => {
    const firstCellX = 5;
    const firstCellY = 10;
    const dimensions = {
      columns: 50,
      pageX: 25,
      pageY: 25,
      rows: 50,
    };
    const position = { x: 0, y: 0 };
    const expectedObj = { x: 5, y: 10 };
    expect(actions.newPosition(firstCellX, firstCellY, dimensions, position)).toEqual(expectedObj);
  });

  it('should return new position restricted by limit', () => {
    const firstCellX = 26;
    const firstCellY = 26;
    const dimensions = {
      columns: 50,
      pageX: 25,
      pageY: 25,
      rows: 50,
    };
    const position = { x: 0, y: 0 };
    const expectedObj = { x: 25, y: 25 };
    expect(actions.newPosition(firstCellX, firstCellY, dimensions, position)).toEqual(expectedObj);
  });
});

describe('Search match boolean check', () => {
  it('should return false when the match objects have no keys', () => {
    const obj1 = {};
    const obj2 = {};
    expect(actions.searchMatch(obj1, obj2)).toBeFalsy();
  });

  it('should return true when the first object has a key', () => {
    const obj1 = { a: 0.5 };
    const obj2 = {};
    expect(actions.searchMatch(obj1, obj2)).toBeTruthy();
  });

  it('should return true when the second object has a key', () => {
    const obj1 = { };
    const obj2 = { a: 0.5 };
    expect(actions.searchMatch(obj1, obj2)).toBeTruthy();
  });
});

describe('Searching available genes', () => {
  describe('should search when a term is present in state', () => {
    let expectedActions;

    beforeAll(() => {
      const columns = {
        names: ['a', 'b', 'c', 'ab', 'ba'],
      };
      const dimensions = {
        columns: 50,
        pageX: 25,
        pageY: 25,
        rows: 50,
      };
      const position = { x: 0, y: 0 };
      const rows = {
        list: [{ name: 'd' }, { name: 'ea' }, { name: 'f' }],
      };
      const search = {
        term: 'a',
      };
      const store = mockStore({
        columns,
        dimensions,
        position,
        rows,
        search,
      });
      store.dispatch(actions.searchGenes());
      expectedActions = store.getActions();
    });

    it('and dispatch a single action', () => {
      expect(expectedActions.length).toBe(1);
    });

    it('and find matches in gene list', () => {
      const columns = { a: 0.1, ab: 0.7, ba: 0.9 };
      const position = { x: 0, y: 1 };
      const rows = { ea: 0.5 };
      expect(expectedActions).toContainEqual({
        columns,
        match: true,
        position,
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
