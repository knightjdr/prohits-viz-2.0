import ColumnsReducer from './columns-reducer';
import * as actions from './columns-actions';
import * as fileActions from '../interactive-file-actions';

const DefaultState = {
  ref: null,
  names: [],
};

describe('Columns set reducer', () => {
  it('should return an empty initial state', () => {
    const action = {};
    const expectedState = DefaultState;
    expect(ColumnsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = {
      ...DefaultState,
    };
    expect(ColumnsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: {
        columns: {
          ref: 'a',
          names: ['a', 'b', 'c'],
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = {
      ref: 'a',
      names: ['a', 'b', 'c'],
    };
    expect(ColumnsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_REFERENCE action', () => {
    const action = {
      ref: 'a',
      type: actions.SET_REFERENCE,
    };
    const expectedState = {
      names: [],
      ref: 'a',
    };
    expect(ColumnsReducer(undefined, action)).toEqual(expectedState);
  });
});
