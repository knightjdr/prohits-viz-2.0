import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import Deepcopy from '../../../helpers/deep-copy';
import {
  RESTORE_ROWS,
  sortDefault,
  sortMethod,
  sortPairByLocale,
  sortRows,
  updateRows,
  UPDATE_ROWS,
} from './rows-actions';

// configure mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const list = [
  { data: [{ value: 1 }, { value: 4 }], name: 'a' },
  { data: [{ value: 5 }, { value: 2 }], name: 'b' },
  { data: [{ value: 2 }, { value: 3 }], name: 'c' },
];

jest.mock('../../../helpers/deep-copy');
Deepcopy.mockReturnValue(list);

describe('Sort by locale', () => {
  it('should sort by value when not zero', () => {
    expect(sortPairByLocale(1, 'a', 'b')).toBe(1);
  });

  it('should sort by input strings when value is zero', () => {
    expect(sortPairByLocale(0, 'a', 'b')).toBe(-1);
    expect(sortPairByLocale(0, 'b', '1')).toBe(1);
  });

  it('should sort case insensitive', () => {
    expect(sortPairByLocale(0, 'a', 'B')).toBe(-1);
    expect(sortPairByLocale(0, 'B', 'a')).toBe(1);
  });
});

describe('Default row sort', () => {
  let expectedActions;

  afterAll(() => {
    fetchMock.restore();
  });

  describe('with no existing index', () => {
    beforeAll(() => {
      const rows = {
        direction: null,
        id: null,
        list,
        order: ['c', 'a', 'b'],
        sortBy: null,
      };
      const store = mockStore({ rows });
      store.dispatch(sortDefault());
      expectedActions = store.getActions();
    });

    it('should dispatch a single action', () => {
      expect(expectedActions.length).toBe(1);
    });

    it('should sort rows based on order in store', () => {
      const sortedRows = [
        { data: [{ value: 2 }, { value: 3 }], name: 'c' },
        { data: [{ value: 1 }, { value: 4 }], name: 'a' },
        { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      ];
      expect(expectedActions).toContainEqual({
        direction: null,
        id: 1,
        list: sortedRows,
        sortBy: null,
        type: RESTORE_ROWS,
      });
    });
  });

  describe('with existing index', () => {
    beforeAll(() => {
      const rows = {
        direction: null,
        id: 1,
        list,
        order: ['c', 'a', 'b'],
        sortBy: null,
      };
      const store = mockStore({ rows });
      store.dispatch(sortDefault());
      expectedActions = store.getActions();
    });

    it('should dispatch a single action', () => {
      expect(expectedActions.length).toBe(1);
    });

    it('should increment index', () => {
      const sortedRows = [
        { data: [{ value: 2 }, { value: 3 }], name: 'c' },
        { data: [{ value: 1 }, { value: 4 }], name: 'a' },
        { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      ];
      expect(expectedActions).toContainEqual({
        direction: null,
        id: 2,
        list: sortedRows,
        sortBy: null,
        type: RESTORE_ROWS,
      });
    });
  });
});

describe('Row sort method', () => {
  it('should return a method for sorting rows by an index in ascending order by ref', () => {
    const func = sortMethod(0, 'asc', 1);
    expect(func(list[0], list[1])).toBe(-2.25);
  });

  it('should return a method for sorting rows by an index in ascending order by ref, and handle zeros', () => {
    const zeroList = [
      { data: [{ value: 1 }, { value: 0 }], name: 'a' },
      { data: [{ value: 5 }, { value: 0 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
    ];
    const func = sortMethod(0, 'asc', 1);
    expect(func(zeroList[0], zeroList[1])).toBe(-4000);
    expect(func(zeroList[0], zeroList[2])).toBeCloseTo(999.334, 2);
    expect(func(zeroList[2], zeroList[0])).toBeCloseTo(-999.334, 2);
  });

  it('should return a method for sorting rows by an index in ascending order', () => {
    const func = sortMethod(0, 'asc');
    expect(func(list[0], list[1])).toBe(-4);
  });

  it('should return a method for sorting rows by an index in descending order by ref', () => {
    const func = sortMethod(0, 'desc', 1);
    expect(func(list[0], list[1])).toBe(2.25);
  });

  it('should return a method for sorting rows by an index in descending order by ref, and handle zeros', () => {
    const zeroList = [
      { data: [{ value: 1 }, { value: 0 }], name: 'a' },
      { data: [{ value: 5 }, { value: 0 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
    ];
    const func = sortMethod(0, 'desc', 1);
    expect(func(zeroList[0], zeroList[1])).toBe(4000);
    expect(func(zeroList[0], zeroList[2])).toBeCloseTo(-999.334, 2);
    expect(func(zeroList[2], zeroList[0])).toBeCloseTo(999.334, 2);
  });

  it('should return a method for sorting rows by an index in descending order', () => {
    const func = sortMethod(0, 'desc');
    expect(func(list[0], list[1])).toBe(4);
  });
});

describe('Row actions', () => {
  afterAll(() => {
    fetchMock.restore();
  });

  it('should dispatch an action to update the rows', () => {
    const expectedAction = {
      direction: 'asc',
      id: 1,
      list,
      sortBy: 0,
      type: UPDATE_ROWS,
    };
    expect(updateRows('asc', list, 0, 1)).toEqual(expectedAction);
  });

  it('should sort rows in descending order by default', () => {
    const rows = {
      direction: null,
      id: null,
      list,
      sortBy: null,
    };
    const sortedRows = [
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
    ];
    const store = mockStore({ rows });
    store.dispatch(sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      id: 1,
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
    });
  });

  it('should sort rows in ascending order when requested', () => {
    const rows = {
      direction: null,
      id: null,
      list,
      sortBy: null,
    };
    const sortedRows = [
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
    ];
    const store = mockStore({ rows });
    store.dispatch(sortRows(1, 'asc'));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'asc',
      id: 1,
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
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
    const sortedRows = [
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
    ];
    const store = mockStore({ rows });
    store.dispatch(sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'asc',
      id: 1,
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
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
    const sortedRows = [
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
    ];
    const store = mockStore({ rows });
    store.dispatch(sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      id: 1,
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
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
    const sortedRows = [
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
    ];
    const store = mockStore({ rows });
    store.dispatch(sortRows(0));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      id: 1,
      list: sortedRows,
      sortBy: 0,
      type: UPDATE_ROWS,
    });
  });

  it('should sort rows in descending order by reference', () => {
    const rows = {
      direction: null,
      id: null,
      list,
      sortBy: null,
    };
    const sortedRows = [
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
    ];
    const store = mockStore({ rows });
    store.dispatch(sortRows(1, 'desc', 0));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      id: 1,
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
    });
  });

  it('should sort rows in ascending order by reference', () => {
    const rows = {
      direction: null,
      id: null,
      list,
      sortBy: null,
    };
    const sortedRows = [
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
    ];
    const store = mockStore({ rows });
    store.dispatch(sortRows(1, 'asc', 0));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'asc',
      id: 1,
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
    });
  });

  it('should increment the id when one is already present', () => {
    const rows = {
      direction: null,
      id: 1,
      list,
      sortBy: null,
    };
    const sortedRows = [
      { data: [{ value: 1 }, { value: 4 }], name: 'a' },
      { data: [{ value: 2 }, { value: 3 }], name: 'c' },
      { data: [{ value: 5 }, { value: 2 }], name: 'b' },
    ];
    const store = mockStore({ rows });
    store.dispatch(sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      id: 2,
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
    });
  });
});
