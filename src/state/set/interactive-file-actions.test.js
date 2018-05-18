import * as actions from './interactive-file-actions';

describe('Interactive file set actions', () => {
  it('Should dispatch an action to clear the file', () => {
    const expectedAction = {
      type: actions.CLEAR_INTERACTIVE_FILE,
    };
    expect(actions.clearIntFile()).toEqual(expectedAction);
  });

  it('Should dispatch an action to set the file', () => {
    const expectedAction = {
      file: {},
      type: actions.SET_INTERACTIVE_FILE,
    };
    expect(actions.setIntFile({})).toEqual(expectedAction);
  });
});
