import FormStepReducer from './form-step-reducer';
import * as actions from './form-step-actions';

describe('Form step set reducer', () => {
  it('should return the initial state', () => {
    const action = {};
    const expectedState = 0;
    expect(FormStepReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle INCREMENT_FORM_STEP action', () => {
    const action = {
      step: 2,
      type: actions.INCREMENT_FORM_STEP,
    };
    const expectedState = 2;
    expect(FormStepReducer(undefined, action)).toBe(expectedState);
  });

  it('should handle CLEAR_FORM_STEP action', () => {
    const action = {
      type: actions.CLEAR_FORM_STEP,
    };
    const expectedState = 0;
    expect(FormStepReducer(undefined, action)).toEqual(expectedState);
  });
});
