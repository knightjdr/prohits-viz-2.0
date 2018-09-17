import deepCopy from '../../../helpers/deep-copy';
import RowsReducer from './rows-reducer';
import * as actions from './rows-actions';
import * as fileActions from '../interactive-file-actions';

const DefaultState = {
  direction: null,
  id: null,
  list: [],
  order: [],
  sortBy: null,
};

jest.mock('../../../helpers/deep-copy');

describe('Rows set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = DefaultState;
    expect(RowsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...DefaultState,
    };
    expect(RowsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const list = [
      { data: {}, name: 'a' },
      { data: {}, name: 'b' },
      { data: {}, name: 'c' },
    ];
    deepCopy.mockReturnValue(list);
    const action = {
      file: {
        rows: {
          direction: 'asc',
          list,
          order: ['a', 'b', 'c'],
          sortBy: 1,
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      direction: 'asc',
      id: null,
      list,
      order: ['a', 'b', 'c'],
      sortBy: 1,
    };
    expect(RowsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle RESTORE_ROWS action', () => {
    const list = [
      { data: {}, name: 'a' },
      { data: {}, name: 'b' },
      { data: {}, name: 'c' },
    ];
    deepCopy.mockReturnValue(list);
    const action = {
      direction: null,
      id: 1,
      list,
      sortBy: null,
      type: actions.RESTORE_ROWS,
    };
    const expectedState = {
      direction: null,
      id: 1,
      list,
      order: [],
      sortBy: null,
    };
    expect(RowsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_ROWS action', () => {
    const list = [
      { data: {}, name: 'a' },
      { data: {}, name: 'b' },
      { data: {}, name: 'c' },
    ];
    deepCopy.mockReturnValue(list);
    const action = {
      direction: 'asc',
      id: 1,
      list,
      sortBy: 1,
      type: actions.UPDATE_ROWS,
    };
    const expectedState = {
      direction: 'asc',
      id: 1,
      list,
      order: [],
      sortBy: 1,
    };
    expect(RowsReducer(undefined, action)).toEqual(expectedState);
  });
});
