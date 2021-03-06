import deepCopy from '../../../helpers/deep-copy';
import rowsReducer, { defaultState } from './rows-reducer';
import * as actions from './rows-actions';
import * as fileActions from '../interactive-file-actions';

jest.mock('../../../helpers/deep-copy');

describe('Rows set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(rowsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...defaultState,
    };
    expect(rowsReducer(undefined, action)).toEqual(expectedState);
  });

  describe('PARSE_INTERACTIVE_FILE action', () => {
    it('should handle action when rows field present', () => {
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
      expect(rowsReducer(undefined, action)).toEqual(expectedState);
    });

    it('should handle action when rows field missing', () => {
      const action = {
        file: {},
        type: fileActions.PARSE_INTERACTIVE_FILE,
      };
      const expectedState = { ...defaultState };
      expect(rowsReducer(undefined, action)).toEqual(expectedState);
    });
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
    expect(rowsReducer(undefined, action)).toEqual(expectedState);
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
    expect(rowsReducer(undefined, action)).toEqual(expectedState);
  });
});
