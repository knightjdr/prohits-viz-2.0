import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import Deepcopy from '../../../helpers/deep-copy';
import { sortMethod, sortRows, updateRows, UPDATE_ROWS } from './rows-actions';

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
    expect(func(zeroList[0], zeroList[1])).toBe(0);
    expect(func(zeroList[0], zeroList[2])).toBe(1);
    expect(func(zeroList[2], zeroList[0])).toBe(-1);
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
    expect(func(zeroList[0], zeroList[1])).toBe(0);
    expect(func(zeroList[0], zeroList[2])).toBe(-1);
    expect(func(zeroList[2], zeroList[0])).toBe(1);
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
      list,
      sortBy: 0,
      type: UPDATE_ROWS,
    };
    expect(updateRows('asc', list, 0)).toEqual(expectedAction);
  });

  it('should sort rows in descending order by default', () => {
    const rows = {
      direction: null,
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
    expect(expectedActions.length).toBe(1);
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
    });
  });

  it('should sort rows in ascending order when requested', () => {
    const rows = {
      direction: null,
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
    expect(expectedActions.length).toBe(1);
    expect(expectedActions).toContainEqual({
      direction: 'asc',
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
    });
  });

  it(`should sort rows in ascending when the last sort was for the same
  index in descending order`, () => {
    const rows = {
      direction: 'desc',
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
    expect(expectedActions.length).toBe(1);
    expect(expectedActions).toContainEqual({
      direction: 'asc',
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
    });
  });

  it(`should sort rows in descending when the last sort was for the same
  index in ascending order`, () => {
    const rows = {
      direction: 'asc',
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
    expect(expectedActions.length).toBe(1);
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
    });
  });

  it(`should sort rows in descending when requested index does not
  match the previous one`, () => {
    const rows = {
      direction: 'desc',
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
    expect(expectedActions.length).toBe(1);
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      list: sortedRows,
      sortBy: 0,
      type: UPDATE_ROWS,
    });
  });

  it('should sort rows in descending order by reference', () => {
    const rows = {
      direction: null,
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
    expect(expectedActions.length).toBe(1);
    expect(expectedActions).toContainEqual({
      direction: 'desc',
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
    });
  });

  it('should sort rows in ascending order by reference', () => {
    const rows = {
      direction: null,
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
    expect(expectedActions.length).toBe(1);
    expect(expectedActions).toContainEqual({
      direction: 'asc',
      list: sortedRows,
      sortBy: 1,
      type: UPDATE_ROWS,
    });
  });
});
