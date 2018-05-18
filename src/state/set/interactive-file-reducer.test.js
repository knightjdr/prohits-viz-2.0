import InteractiveFileReducer from './interactive-file-reducer';
import * as actions from './interactive-file-actions';

const state = {
  empty: null,
  set: {},
};

describe('Interactive file set reducer', () => {
  it('Should return the initial state', () => {
    expect(InteractiveFileReducer(undefined, {})).toEqual(state.empty);
  });

  it('Should handle CLEAR_INTERACTIVE_FILE', () => {
    expect(InteractiveFileReducer(undefined, {
      type: actions.CLEAR_INTERACTIVE_FILE,
    })).toEqual(state.empty);
  });

  it('Should handle SET_INTERACTIVE_FILE', () => {
    expect(InteractiveFileReducer(undefined, {
      file: {},
      type: actions.SET_INTERACTIVE_FILE,
    })).toEqual(state.set);
  });
});
