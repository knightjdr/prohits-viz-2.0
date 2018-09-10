import * as actions from './go-actions';

describe('GO analysis set actions', () => {
  it('should dispatch an action to clear the annotation', () => {
    const expectedAction = {
      type: actions.CLEAR_GO_ANNOTATION,
    };
    expect(actions.clearGoAnnotation()).toEqual(expectedAction);
  });

  it('should dispatch an action to set the annotation', () => {
    const expectedAction = {
      text: 'text',
      type: actions.SET_GO_ANNOTATION,
    };
    expect(actions.setGoAnnotation('text')).toEqual(expectedAction);
  });
});
