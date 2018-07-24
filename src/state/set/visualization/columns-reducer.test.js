import ColumnsReducer from './columns-reducer';
import * as fileActions from '../interactive-file-actions';

// import DefaultState from '../../../visualization/test/annotations';
const DefaultState = {
  ref: null,
  names: [],
};


describe('Columns set reducer', () => {
  it('should return an empty initial state', () => {
    expect(ColumnsReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE', () => {
    const expectedState = {
      ...DefaultState,
    };
    expect(ColumnsReducer(undefined, {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE', () => {
    const expectedState = {
      ref: 'a',
      names: ['a', 'b', 'c'],
    };
    expect(ColumnsReducer(undefined, {
      file: {
        columns: {
          ref: 'a',
          names: ['a', 'b', 'c'],
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });
});
