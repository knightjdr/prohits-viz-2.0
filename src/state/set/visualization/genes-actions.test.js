import {
  MapList,
  setSelections,
  SET_SELECTIONS,
  storeSelections,
  STORE_SELECTIONS,
} from './genes-actions';

describe('Map list', () => {
  it(`should map an array to an object with array values as props and
  index as the value`, () => {
    const arr = ['a', 'b', 'c'];
    expect(MapList(arr)).toEqual({ a: 0, b: 1, c: 2 });
  });
});

describe('Visualization gene selections set actions', () => {
  it('should dispatch an action to set selections', () => {
    const expectedAction = {
      columnMap: {},
      columns: [],
      rowMap: {},
      rows: [],
      type: SET_SELECTIONS,
    };
    expect(setSelections([], [])).toEqual(expectedAction);
  });

  it('should dispatch an action to store selections', () => {
    const expectedAction = {
      selections: {},
      type: STORE_SELECTIONS,
    };
    expect(storeSelections({})).toEqual(expectedAction);
  });
});
