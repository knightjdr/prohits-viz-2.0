import * as actions from './form-step-actions';

describe('Form step set actions', () => {
  it('should dispatch an action to increment the step', () => {
    const expectedAction = {
      step: 2,
      type: actions.INCREMENT_FORM_STEP,
    };
    expect(actions.incrementFormStep(1)).toEqual(expectedAction);
  });

  it('should dispatch an action to clear the form step', () => {
    const expectedAction = {
      type: actions.CLEAR_FORM_STEP,
    };
    expect(actions.clearFormStep()).toEqual(expectedAction);
  });
});
