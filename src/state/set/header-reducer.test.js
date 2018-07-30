import HeaderReducer from './header-reducer';
import * as actions from './header-actions';

describe('File header set reducer', () => {
  it('should return the initial state', () => {
    const action = {};
    const expectedState = [];
    expect(HeaderReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_FILE_HEADER action', () => {
    const header = ['column1', 'column2'];
    const action = {
      header,
      type: actions.SET_FILE_HEADER,
    };
    const expectedState = header;
    expect(HeaderReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_FILE_HEADER action', () => {
    const action = {
      type: actions.CLEAR_FILE_HEADER,
    };
    const expectedState = [];
    expect(HeaderReducer(undefined, action)).toEqual(expectedState);
  });
});
