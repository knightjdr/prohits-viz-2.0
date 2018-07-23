import GeneReducer from './genes-reducer';
import * as actions from './genes-actions';

const DefaultState = {
  columnMap: {},
  columns: [],
  columnsSelected: [],
  rowMap: {},
  rows: [],
  rowsSelected: [],
};

describe('Gene selection set reducer', () => {
  it('should return an empty initial state', () => {
    expect(GeneReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle SET_SELECTIONS', () => {
    const expectedState = {
      ...DefaultState,
      columnMap: { a: 0, b: 1, c: 2 },
      columns: ['a', 'b', 'c'],
      rowMap: { d: 0, e: 1, f: 2 },
      rows: ['d', 'e', 'f'],
    };
    expect(GeneReducer(undefined, {
      columnMap: { a: 0, b: 1, c: 2 },
      columns: ['a', 'b', 'c'],
      rowMap: { d: 0, e: 1, f: 2 },
      rows: ['d', 'e', 'f'],
      type: actions.SET_SELECTIONS,
    })).toEqual(expectedState);
  });

  it('should handle STORE_SELECTIONS', () => {
    const expectedState = {
      columnMap: { a: 0, b: 1, c: 2 },
      columns: ['b'],
      columnsSelected: ['a', 'c'],
      rowMap: { d: 0, e: 1, f: 2 },
      rows: ['d', 'f'],
      rowsSelected: ['e'],
    };
    expect(GeneReducer(
      {
        columnMap: { a: 0, b: 1, c: 2 },
        rowMap: { d: 0, e: 1, f: 2 },
      },
      {
        selections: {
          columns: ['b'],
          columnsSelected: ['a', 'c'],
          rows: ['d', 'f'],
          rowsSelected: ['e'],
        },
        type: actions.STORE_SELECTIONS,
      },
    )).toEqual(expectedState);
  });
});
