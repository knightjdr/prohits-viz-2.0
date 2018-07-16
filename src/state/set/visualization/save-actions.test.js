import * as actions from './save-actions';

describe('Visualization save set actions', () => {
  it('should dispatch an action to change image type', () => {
    const expectedAction = {
      imageType: 'png',
      type: actions.SAVE_IMAGE_TYPE,
    };
    expect(actions.saveImageType('png')).toEqual(expectedAction);
  });

  it('should dispatch an action to save session name', () => {
    const expectedAction = {
      name: 'testname',
      type: actions.SAVE_SESSION_NAME,
    };
    expect(actions.saveSessionName('testname')).toEqual(expectedAction);
  });
});
