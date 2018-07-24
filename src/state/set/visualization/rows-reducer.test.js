import DeepCopy from '../../../helpers/deep-copy';
import RowsReducer from './rows-reducer';
import * as fileActions from '../interactive-file-actions';

// import DefaultState from '../../../visualization/test/annotations';
const DefaultState = {
  list: [],
  order: [],
};

jest.mock('../../../helpers/deep-copy');

describe('Rows set reducer', () => {
  it('should return an empty initial state', () => {
    expect(RowsReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE', () => {
    const expectedState = {
      ...DefaultState,
    };
    expect(RowsReducer(undefined, {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE', () => {
    const list = [
      { data: {}, name: 'a' },
      { data: {}, name: 'b' },
      { data: {}, name: 'c' },
    ];
    DeepCopy.mockReturnValue(list);
    const expectedState = {
      list,
      order: ['a', 'b', 'c'],
    };
    expect(RowsReducer(undefined, {
      file: {
        rows: {
          list,
          order: ['a', 'b', 'c'],
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });
});
