import * as actions from './panel-actions';

describe('Visualization panel set actions', () => {
  it('should dispatch an action to toggle the panel', () => {
    const expectedAction = {
      type: actions.TOGGLE_PANEL,
    };
    expect(actions.togglePanel()).toEqual(expectedAction);
  });
});
