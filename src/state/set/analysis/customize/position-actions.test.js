import * as actions from './position-actions';

describe('Customize position set actions', () => {
  it('should dispatch an action to update the image position', () => {
    const expectedAction = {
      type: actions.UPDATE_CUSTOMIZE_POSITION,
      x: 0.5,
      y: 0.3,
    };
    expect(actions.updatePosition(0.5, 0.3)).toEqual(expectedAction);
  });
});
