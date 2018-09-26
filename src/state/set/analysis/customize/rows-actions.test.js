import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './rows-actions';

// configure mock store
const mockStore = configureMockStore([thunk]);

const rows = {
  list: [
    {
      data: [{ value: 1 }, { value: 2 }, { value: 3 }],
      name: 'x',
    },
    {
      data: [{ value: 0 }, { value: 6 }, { value: 0 }],
      name: 'y',
    },
    {
      data: [{ value: 9 }, { value: 4 }, { value: 11 }],
      name: 'z',
    },
  ],
  order: ['x', 'y', 'z'],
};
const customize = [{
  columns: {
    names: ['a', 'b', 'c'],
    ref: null,
  },
  direction: null,
  id: 0,
  removeEmpty: false,
  resetMaximums: false,
  rows,
  sortBy: null,
}];

describe('Customize row sort', () => {
  it('should sort rows in descending order by default', () => {
    const currentCustomize = customize;
    const sortedList = [
      {
        data: [{ value: 0 }, { value: 6 }, { value: 0 }],
        name: 'y',
      },
      {
        data: [{ value: 9 }, { value: 4 }, { value: 11 }],
        name: 'z',
      },
      {
        data: [{ value: 1 }, { value: 2 }, { value: 3 }],
        name: 'x',
      },
    ];
    const store = mockStore({ customize: currentCustomize });
    store.dispatch(actions.sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      columns: currentCustomize[0].columns.names,
      direction: 'desc',
      id: 1,
      ref: undefined,
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: sortedList,
        order: ['y', 'z', 'x'],
      },
      sortBy: 1,
      type: actions.SORT_CUSTOMIZE_STATE,
    });
  });

  it('should sort rows in ascending order by default', () => {
    const currentCustomize = customize;
    const sortedList = [
      {
        data: [{ value: 1 }, { value: 2 }, { value: 3 }],
        name: 'x',
      },
      {
        data: [{ value: 9 }, { value: 4 }, { value: 11 }],
        name: 'z',
      },
      {
        data: [{ value: 0 }, { value: 6 }, { value: 0 }],
        name: 'y',
      },
    ];
    const store = mockStore({ customize: currentCustomize });
    store.dispatch(actions.sortRows(1, 'asc'));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      columns: currentCustomize[0].columns.names,
      direction: 'asc',
      id: 1,
      ref: undefined,
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: sortedList,
        order: ['x', 'z', 'y'],
      },
      sortBy: 1,
      type: actions.SORT_CUSTOMIZE_STATE,
    });
  });

  it(`should sort rows in ascending when the last sort was for the same
  index in descending order`, () => {
    const currentCustomize = [
      {
        ...customize[0],
        direction: 'desc',
        sortBy: 1,
      },
    ];
    const sortedList = [
      {
        data: [{ value: 1 }, { value: 2 }, { value: 3 }],
        name: 'x',
      },
      {
        data: [{ value: 9 }, { value: 4 }, { value: 11 }],
        name: 'z',
      },
      {
        data: [{ value: 0 }, { value: 6 }, { value: 0 }],
        name: 'y',
      },
    ];
    const store = mockStore({ customize: currentCustomize });
    store.dispatch(actions.sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      columns: currentCustomize[0].columns.names,
      direction: 'asc',
      id: 1,
      ref: undefined,
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: sortedList,
        order: ['x', 'z', 'y'],
      },
      sortBy: 1,
      type: actions.SORT_CUSTOMIZE_STATE,
    });
  });

  it(`should sort rows in descending when the last sort was for the same
  index in ascending order`, () => {
    const currentCustomize = [
      {
        ...customize[0],
        direction: 'asc',
        sortBy: 1,
      },
    ];
    const sortedList = [
      {
        data: [{ value: 0 }, { value: 6 }, { value: 0 }],
        name: 'y',
      },
      {
        data: [{ value: 9 }, { value: 4 }, { value: 11 }],
        name: 'z',
      },
      {
        data: [{ value: 1 }, { value: 2 }, { value: 3 }],
        name: 'x',
      },
    ];
    const store = mockStore({ customize: currentCustomize });
    store.dispatch(actions.sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      columns: currentCustomize[0].columns.names,
      direction: 'desc',
      id: 1,
      ref: undefined,
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: sortedList,
        order: ['y', 'z', 'x'],
      },
      sortBy: 1,
      type: actions.SORT_CUSTOMIZE_STATE,
    });
  });

  it(`should sort rows in descending when requested index does not
  match the previous one`, () => {
    const currentCustomize = [
      {
        ...customize[0],
        direction: 'asc',
        sortBy: 0,
      },
    ];
    const sortedList = [
      {
        data: [{ value: 0 }, { value: 6 }, { value: 0 }],
        name: 'y',
      },
      {
        data: [{ value: 9 }, { value: 4 }, { value: 11 }],
        name: 'z',
      },
      {
        data: [{ value: 1 }, { value: 2 }, { value: 3 }],
        name: 'x',
      },
    ];
    const store = mockStore({ customize: currentCustomize });
    store.dispatch(actions.sortRows(1));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      columns: currentCustomize[0].columns.names,
      direction: 'desc',
      id: 1,
      ref: undefined,
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: sortedList,
        order: ['y', 'z', 'x'],
      },
      sortBy: 1,
      type: actions.SORT_CUSTOMIZE_STATE,
    });
  });

  it('should sort rows in descending order by reference', () => {
    const currentCustomize = customize;
    const sortedList = [
      {
        data: [{ value: 0 }, { value: 6 }, { value: 0 }],
        name: 'y',
      },
      {
        data: [{ value: 1 }, { value: 2 }, { value: 3 }],
        name: 'x',
      },
      {
        data: [{ value: 9 }, { value: 4 }, { value: 11 }],
        name: 'z',
      },
    ];
    const store = mockStore({ customize: currentCustomize });
    store.dispatch(actions.sortRows(1, 'desc', 0));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      columns: currentCustomize[0].columns.names,
      direction: 'desc',
      id: 1,
      ref: 'a',
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: sortedList,
        order: ['y', 'x', 'z'],
      },
      sortBy: 1,
      type: actions.SORT_CUSTOMIZE_STATE,
    });
  });

  it('should sort rows in ascending order by reference', () => {
    const currentCustomize = customize;
    const sortedList = [
      {
        data: [{ value: 9 }, { value: 4 }, { value: 11 }],
        name: 'z',
      },
      {
        data: [{ value: 1 }, { value: 2 }, { value: 3 }],
        name: 'x',
      },
      {
        data: [{ value: 0 }, { value: 6 }, { value: 0 }],
        name: 'y',
      },
    ];
    const store = mockStore({ customize: currentCustomize });
    store.dispatch(actions.sortRows(1, 'asc', 0));
    const expectedActions = store.getActions();
    expect(expectedActions).toContainEqual({
      columns: currentCustomize[0].columns.names,
      direction: 'asc',
      id: 1,
      ref: 'a',
      removeEmpty: false,
      resetMaximums: false,
      rows: {
        list: sortedList,
        order: ['z', 'x', 'y'],
      },
      sortBy: 1,
      type: actions.SORT_CUSTOMIZE_STATE,
    });
  });
});
