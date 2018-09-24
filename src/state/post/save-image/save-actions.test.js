import * as actions from './save-actions';

describe('Save image', () => {
  it('should dispatch an action when there is an error', () => {
    const expectedAction = {
      type: actions.SAVE_ERROR,
    };
    expect(actions.saveError()).toEqual(expectedAction);
  });

  it('should dispatch an action to on saving image', () => {
    const expectedAction = {
      type: actions.SAVING_IMAGE,
    };
    expect(actions.savingImage()).toEqual(expectedAction);
  });
});
