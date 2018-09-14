import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import deepCopy from '../../../helpers/deep-copy';
import * as actions from './rows-actions';

// configure mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const list = [
  { data: [{ value: 1 }, { value: 4 }], name: 'a' },
  { data: [{ value: 5 }, { value: 2 }], name: 'b' },
  { data: [{ value: 2 }, { value: 3 }], name: 'c' },
];

jest.mock('../../../helpers/deep-copy');
deepCopy.mockReturnValue(list);

describe('Row actions', () => {
  it('should dispatch an action to restore the rows', () => {
    const rows = {
      list: ['a', 'b', 'c'],
      map: { a: 0, b: 1, c: 2 },
    };
    const expectedAction = {
      direction: 'asc',
      id: 1,
      list,
      rows,
      sortBy: 0,
      type: actions.RESTORE_ROWS,
    };
    expect(actions.restoreRows('asc', list, 0, 1, rows)).toEqual(expectedAction);
  });

  it('should dispatch an action to update the rows', () => {
    const rows = {
      list: ['a', 'b', 'c'],
      map: { a: 0, b: 1, c: 2 },
    };
    const expectedAction = {
      direction: 'asc',
      id: 1,
      list,
      rows,
      sortBy: 0,
      type: actions.UPDATE_ROWS,
    };
    expect(actions.updateRows('asc', list, 0, 1, rows)).toEqual(expectedAction);
  });
});

describe('Row mapping', () => {
  let rows;
  beforeAll(() => {
    const currRows = ['a', 'c'];
    const sortedList = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
    rows = actions.rowMapping(currRows, sortedList);
  });

  it('should create an array of row names filtered by curr row list', () => {
    expect(rows.list).toEqual(['a', 'c']);
  });

  it('should create a map of rowNames to indices', () => {
    expect(rows.mapped).toEqual({ a: 0, c: 1 });
  });
});

describe('Sort by locale', () => {
  it('should sort by value when not zero', () => {
    expect(actions.sortPairByLocale(1, 'a', 'b')).toBe(1);
  });

  it('should sort by input strings when value is zero', () => {
    expect(actions.sortPairByLocale(0, 'a', 'b')).toBe(-1);
    expect(actions.sortPairByLocale(0, 'b', '1')).toBe(1);
  });

  it('should sort case insensitive', () => {
    expect(actions.sortPairByLocale(0, 'a', 'B')).toBe(-1);
    expect(actions.sortPairByLocale(0, 'B', 'a')).toBe(1);
  });
});

describe('Default row sort', () => {
  let expectedActions;

  describe('with no existing index', () => {
    beforeAll(() => {
      const genes = {
        rows: ['a', 'b', 'c'],
      };
      const rows = {
        direction: null,
        id: null,
        list,
        order: ['c', 'a', 'b'],
        sortBy: null,
      };
      const store = mockStore({ genes, rows });
      store.dispatch(actions.sortDefault());
      expectedActions = store.getActions();
    });

    it('should dispatch a single action', () => {
      expect(expectedActions.length).toBe(1);
    });

    it('should sort rows based on order in store', () => {
      const rows = {
        list: ['c', 'a', 'b'],
        mapped: { c: 0, a: 1, b: 2 },
      };
      const sortedRows = [
        { data: [{ value: 2 }, { value: 3 }], name: 'c' },
        { data: [{ value: 1 }, { value: 4 }], name: 'a' },
        { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      ];
      expect(expectedActions).toContainEqual({
        direction: null,
        id: 1,
        list: sortedRows,
        rows,
        sortBy: null,
        type: actions.RESTORE_ROWS,
      });
    });
  });

  describe('with existing index', () => {
    beforeAll(() => {
      const genes = {
        rows: ['a', 'b', 'c'],
      };
      const rows = {
        direction: null,
        id: 1,
        list,
        order: ['c', 'a', 'b'],
        sortBy: null,
      };
      const store = mockStore({ genes, rows });
      store.dispatch(actions.sortDefault());
      expectedActions = store.getActions();
    });

    it('should dispatch a single action', () => {
      expect(expectedActions.length).toBe(1);
    });

    it('should increment index', () => {
      const rows = {
        list: ['c', 'a', 'b'],
        mapped: { c: 0, a: 1, b: 2 },
      };
      const sortedRows = [
        { data: [{ value: 2 }, { value: 3 }], name: 'c' },
        { data: [{ value: 1 }, { value: 4 }], name: 'a' },
        { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      ];
      expect(expectedActions).toContainEqual({
        direction: null,
        id: 2,
        list: sortedRows,
        rows,
        sortBy: null,
        type: actions.RESTORE_ROWS,
      });
    });
  });
});

describe('Row sort method', () => {
  it('should return a method for sorting rows by an index in ascending order by ref', () => {
    const func = actions.sortMethod(0, 'asc', 1);
    expect(func(list[0], list[1])).toBe(-2.25);
  });

  it('should return a method for sorting rows by an index in ascending order by ref, and handle zeros', () => {
    const zeroList = [
      { data: [{ value: 1 }, { value: 0 }], name: 'a' },
      { data: [{ value: 5 }, { value: 0 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
    ];
    const func = actions.sortMethod(0, 'asc', 1);
    expect(func(zeroList[0], zeroList[1])).toBe(-4000);
    expect(func(zeroList[0], zeroList[2])).toBeCloseTo(999.334, 2);
    expect(func(zeroList[2], zeroList[0])).toBeCloseTo(-999.334, 2);
  });

  it('should return a method for sorting rows by an index in ascending order', () => {
    const func = actions.sortMethod(0, 'asc');
    expect(func(list[0], list[1])).toBe(-4);
  });

  it('should return a method for sorting rows by an index in descending order by ref', () => {
    const func = actions.sortMethod(0, 'desc', 1);
    expect(func(list[0], list[1])).toBe(2.25);
  });

  it('should return a method for sorting rows by an index in descending order by ref, and handle zeros', () => {
    const zeroList = [
      { data: [{ value: 1 }, { value: 0 }], name: 'a' },
      { data: [{ value: 5 }, { value: 0 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
    ];
    const func = actions.sortMethod(0, 'desc', 1);
    expect(func(zeroList[0], zeroList[1])).toBe(4000);
    expect(func(zeroList[0], zeroList[2])).toBeCloseTo(-999.334, 2);
    expect(func(zeroList[2], zeroList[0])).toBeCloseTo(999.334, 2);
  });

  it('should return a method for sorting rows by an index in descending order', () => {
    const func = actions.sortMethod(0, 'desc');
    expect(func(list[0], list[1])).toBe(4);
  });
});

describe('Row update', () => {
  const genes = {
    rows: ['a', 'b', 'c'],
  };

  it('should sort rows in descending order by default', () => {
    const rows = {
      direction: null,
      id: null,
      list,
      sortBy: null,
    };
    const rowlist = {
      list: ['a', 'c', 'b'],
      mapped: { a: 0, c: 1, b: 2 },
    };
    const sortedRows = [
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
    ];
    const store = mockStore({ genes, rows });
    store.dispatch(actions.sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      id: 1,
      list: sortedRows,
      rows: rowlist,
      sortBy: 1,
      type: actions.UPDATE_ROWS,
    });
  });

  it('should sort rows in ascending order when requested', () => {
    const rows = {
      direction: null,
      id: null,
      list,
      sortBy: null,
    };
    const rowlist = {
      list: ['b', 'c', 'a'],
      mapped: { b: 0, c: 1, a: 2 },
    };
    const sortedRows = [
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
    ];
    const store = mockStore({ genes, rows });
    store.dispatch(actions.sortRows(1, 'asc'));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'asc',
      id: 1,
      list: sortedRows,
      rows: rowlist,
      sortBy: 1,
      type: actions.UPDATE_ROWS,
    });
  });

  it(`should sort rows in ascending when the last sort was for the same
  index in descending order`, () => {
    const rows = {
      direction: 'desc',
      id: null,
      list,
      sortBy: 1,
    };
    const rowlist = {
      list: ['b', 'c', 'a'],
      mapped: { b: 0, c: 1, a: 2 },
    };
    const sortedRows = [
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
    ];
    const store = mockStore({ genes, rows });
    store.dispatch(actions.sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'asc',
      id: 1,
      list: sortedRows,
      rows: rowlist,
      sortBy: 1,
      type: actions.UPDATE_ROWS,
    });
  });

  it(`should sort rows in descending when the last sort was for the same
  index in ascending order`, () => {
    const rows = {
      direction: 'asc',
      id: null,
      list,
      sortBy: 1,
    };
    const rowlist = {
      list: ['a', 'c', 'b'],
      mapped: { a: 0, c: 1, b: 2 },
    };
    const sortedRows = [
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
    ];
    const store = mockStore({ genes, rows });
    store.dispatch(actions.sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      id: 1,
      list: sortedRows,
      rows: rowlist,
      sortBy: 1,
      type: actions.UPDATE_ROWS,
    });
  });

  it(`should sort rows in descending when requested index does not
  match the previous one`, () => {
    const rows = {
      direction: 'desc',
      id: null,
      list,
      sortBy: 1,
    };
    const rowlist = {
      list: ['b', 'c', 'a'],
      mapped: { b: 0, c: 1, a: 2 },
    };
    const sortedRows = [
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
    ];
    const store = mockStore({ genes, rows });
    store.dispatch(actions.sortRows(0));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      id: 1,
      list: sortedRows,
      rows: rowlist,
      sortBy: 0,
      type: actions.UPDATE_ROWS,
    });
  });

  it('should sort rows in descending order by reference', () => {
    const rows = {
      direction: null,
      id: null,
      list,
      sortBy: null,
    };
    const rowlist = {
      list: ['a', 'c', 'b'],
      mapped: { a: 0, c: 1, b: 2 },
    };
    const sortedRows = [
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
    ];
    const store = mockStore({ genes, rows });
    store.dispatch(actions.sortRows(1, 'desc', 0));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      id: 1,
      list: sortedRows,
      rows: rowlist,
      sortBy: 1,
      type: actions.UPDATE_ROWS,
    });
  });

  it('should sort rows in ascending order by reference', () => {
    const rows = {
      direction: null,
      id: null,
      list,
      sortBy: null,
    };
    const rowlist = {
      list: ['b', 'c', 'a'],
      mapped: { b: 0, c: 1, a: 2 },
    };
    const sortedRows = [
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
    ];
    const store = mockStore({ genes, rows });
    store.dispatch(actions.sortRows(1, 'asc', 0));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'asc',
      id: 1,
      list: sortedRows,
      rows: rowlist,
      sortBy: 1,
      type: actions.UPDATE_ROWS,
    });
  });

  it('should increment the id when one is already present', () => {
    const rows = {
      direction: null,
      id: 1,
      list,
      sortBy: null,
    };
    const rowlist = {
      list: ['a', 'c', 'b'],
      mapped: { a: 0, c: 1, b: 2 },
    };
    const sortedRows = [
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
    ];
    const store = mockStore({ genes, rows });
    store.dispatch(actions.sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      id: 2,
      list: sortedRows,
      rows: rowlist,
      sortBy: 1,
      type: actions.UPDATE_ROWS,
    });
  });
});
