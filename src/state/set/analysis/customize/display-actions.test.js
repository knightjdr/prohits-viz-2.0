import * as actions from './display-actions';

describe('Customize display set actions', () => {
  it('should dispatch an action to update plot position', () => {
    const expectedAction = {
      fixed: true,
      translate: -200,
      type: actions.UPDATE_CUSTOMIZE_PLOT_POSITION,
    };
    expect(actions.updatePlotPosition(true, -200)).toEqual(expectedAction);
  });
});
