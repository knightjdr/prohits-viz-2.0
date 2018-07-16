import GeneReducer, { MapList } from './genes-reducer';
import * as actions from './genes-actions';

const DefaultState = {
  columnMap: { 'gene-a': 0, 'gene-b': 1, 'gene-c': 2 },
  columns: ['gene-a', 'gene-b', 'gene-c'],
  columnsSelected: [],
  rowMap: { 'gene-d': 0, 'gene-e': 1, 'gene-f': 2 },
  rows: ['gene-d', 'gene-e', 'gene-f'],
  rowsSelected: [],
};

describe('Map list', () => {
  it(`should map an array to an object with array values as props and
  index as the value`, () => {
    const arr = ['a', 'b', 'c'];
    expect(MapList(arr)).toEqual({ a: 0, b: 1, c: 2 });
  });
});

describe('Gene selection set reducer', () => {
  it('should return a default initial state', () => {
    expect(GeneReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle SET_SELECTIONS', () => {
    const expectedState = {
      columnMap: { a: 0, b: 1, c: 2 },
      columns: ['a', 'b', 'c'],
      columnsSelected: [],
      rowMap: { d: 0, e: 1, f: 2 },
      rows: ['d', 'e', 'f'],
      rowsSelected: [],
    };
    expect(GeneReducer(undefined, {
      columns: ['a', 'b', 'c'],
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
