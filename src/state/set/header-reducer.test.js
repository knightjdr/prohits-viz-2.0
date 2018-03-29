import HeaderReducer from './header-reducer';
import * as actions from './header-actions';

const header = ['column1', 'column2'];
const state = {
  empty: [],
  set: header,
};

describe('File header set reducer', () => {
  it('Should return the initial state', () => {
    expect(HeaderReducer(undefined, {})).toEqual(state.empty);
  });

  it('Should handle SET_FILE_HEADER', () => {
    expect(HeaderReducer(undefined, {
      header,
      type: actions.SET_FILE_HEADER,
    })).toEqual(state.set);
  });

  it('Should handle CLEAR_FILE_HEADER', () => {
    expect(HeaderReducer(undefined, {
      type: actions.CLEAR_FILE_HEADER,
    })).toEqual(state.empty);
  });
});
