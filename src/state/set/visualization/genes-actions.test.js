import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './genes-actions';

// configure mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Visualization gene selections set actions', () => {
  it('should dispatch an action to update selections', () => {
    const expectedAction = {
      selections: {},
      type: actions.UPDATE_SELECTIONS,
    };
    expect(actions.updateGeneList({})).toEqual(expectedAction);
  });
});

describe('Add items to target list', () => {
  it('using append', () => {
    const list = ['a', 'b'];
    const target = ['c'];
    expect(actions.addToTarget(list, target)).toEqual(['c', 'a', 'b']);
  });

  it('using replace', () => {
    const list = ['a', 'b'];
    const target = ['c'];
    expect(actions.addToTarget(list, target, true)).toEqual(['a', 'b']);
  });
});

describe('Filter list', () => {
  it('with replace should require gene in either source or target', () => {
    const list = ['a', 'd', 'g'];
    const source = ['a', 'b', 'c'];
    const target = ['d', 'e', 'f'];
    expect(actions.filterGeneList(list, source, target, true)).toEqual(['a', 'd',]);
  });

  it('without replace should require gene in source but not target', () => {
    const list = ['a', 'd', 'g'];
    const source = ['a', 'b', 'c'];
    const target = ['d', 'e', 'f'];
    expect(actions.filterGeneList(list, source, target)).toEqual(['a']);
  });
});

describe('Sort target list by a map object', () => {
  it('when requested', () => {
    const map = { a: 1, b: 0, c: 2 };
    const target = ['c', 'b', 'a'];
    expect(actions.sortTarget(target, map)).toEqual(['b', 'a', 'c']);
  });

  it('when not requested do not sort', () => {
    const target = ['c', 'b', 'a'];
    expect(actions.sortTarget(target)).toEqual(['c', 'b', 'a']);
  });
});

describe('Update source list', () => {
  it('with basic update', () => {
    const list = ['b'];
    const source = ['a', 'b', 'c'];
    expect(actions.updateSource(list, source)).toEqual(['a', 'c']);
  });

  it('and replace', () => {
    const list = ['b', 'd'];
    const source = ['a', 'b', 'c'];
    const target = ['d', 'e'];
    const newTarget = ['b', 'd'];
    expect(actions.updateSource(list, source, target, newTarget, undefined, true)).toEqual(['a', 'c', 'e']);
  });

  it('and sort', () => {
    const list = ['b', 'd'];
    const map = { a: 1, c: 2, e: 0 };
    const source = ['a', 'b', 'c'];
    const target = ['d', 'e'];
    const newTarget = ['b', 'd'];
    expect(actions.updateSource(list, source, target, newTarget, map, true)).toEqual(['e', 'a', 'c']);
  });
});

describe('Set and update single gene list', () => {
  let expectedActions;

  beforeAll(() => {
    const genes = {
      rows: ['b', 'c'],
      rowsSelected: ['a'],
    };
    const store = mockStore({ genes });
    store.dispatch(actions.setSelections(['a', 'b', 'd'], 'rows', 'rowsSelected'));
    expectedActions = store.getActions();
  });

  it('should dispatch a single action', () => {
    expect(expectedActions.length).toBe(1);
  });

  it('should dispatch an action to set the gene lists', () => {
    expect(expectedActions).toContainEqual({
      selections: {
        rows: ['c'],
        rowsSelected: ['a', 'b'],
      },
      type: actions.UPDATE_SELECTIONS,
    });
  });
});
