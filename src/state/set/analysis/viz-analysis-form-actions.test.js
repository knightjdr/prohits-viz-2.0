import * as actions from './viz-analysis-form-actions';

describe('Go form set actions', () => {
  it('should dispatch an action to set a customize form parameter', () => {
    const expectedAction = {
      setting: { param: 'test' },
      type: actions.SET_CUSTOMIZE_PARAMETER,
    };
    expect(actions.setCustomizeParameters({ param: 'test' })).toEqual(expectedAction);
  });

  it('should dispatch an action to set a GO form parameter', () => {
    const expectedAction = {
      setting: { param: 'test' },
      type: actions.SET_GO_PARAMETER,
    };
    expect(actions.setGoParameters({ param: 'test' })).toEqual(expectedAction);
  });
});
