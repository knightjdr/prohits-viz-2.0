import * as actions from './viz-analysis-form-actions';

describe('Go form set actions', () => {
  it('should dispatch an action to set a form parameter', () => {
    const expectedAction = {
      setting: { param: 'test' },
      type: actions.SET_GO_PARAMETER,
    };
    expect(actions.setGoParameters({ param: 'test' })).toEqual(expectedAction);
  });
});
