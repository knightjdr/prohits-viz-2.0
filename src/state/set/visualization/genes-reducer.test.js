import GeneReducer from './genes-reducer';
import * as actions from './genes-actions';
import * as fileActions from '../interactive-file-actions';
import * as rowActions from './rows-actions';

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
    const action = {};
    const expectedState = DefaultState;
    expect(GeneReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...DefaultState,
    };
    expect(GeneReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: {
        genes: {
          columnMap: { a: 0, b: 1, c: 2 },
          columns: ['a', 'b', 'c'],
          columnsSelected: ['b'],
          rowMap: { d: 0, e: 1, f: 2 },
          rows: ['d', 'e', 'f'],
          rowsSelected: ['d', 'e'],
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      columnMap: { a: 0, b: 1, c: 2 },
      columns: ['a', 'b', 'c'],
      columnsSelected: ['b'],
      rowMap: { d: 0, e: 1, f: 2 },
      rows: ['d', 'e', 'f'],
      rowsSelected: ['d', 'e'],
    };
    expect(GeneReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle RESTORE_ROWS action', () => {
    const action = {
      rows: {
        list: ['d', 'e', 'f'],
        mapped: { d: 0, e: 1, f: 2 },
      },
      type: rowActions.RESTORE_ROWS,
    };
    const expectedState = {
      ...DefaultState,
      rowMap: { d: 0, e: 1, f: 2 },
      rows: ['d', 'e', 'f'],
    };
    expect(GeneReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_ROWS action', () => {
    const action = {
      rows: {
        list: ['d', 'e', 'f'],
        mapped: { d: 0, e: 1, f: 2 },
      },
      type: rowActions.UPDATE_ROWS,
    };
    const expectedState = {
      ...DefaultState,
      rowMap: { d: 0, e: 1, f: 2 },
      rows: ['d', 'e', 'f'],
    };
    expect(GeneReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_SELECTIONS action', () => {
    const action = {
      selections: {
        columns: ['a', 'b', 'c'],
        rows: ['d', 'e', 'f'],
      },
      type: actions.UPDATE_SELECTIONS,
    };
    const expectedState = {
      ...DefaultState,
      columns: ['a', 'b', 'c'],
      rows: ['d', 'e', 'f'],
    };
    expect(GeneReducer(undefined, action)).toEqual(expectedState);
  });
});
