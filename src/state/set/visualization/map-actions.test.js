import * as actions from './map-actions';

describe('Visualization map set actions', () => {
  it('should dispatch an action to toggle annotations', () => {
    const expectedAction = {
      type: actions.TOGGLE_ANNOTATIONS,
    };
    expect(actions.toggleAnnotations()).toEqual(expectedAction);
  });
});
