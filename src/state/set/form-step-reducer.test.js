import FormStepReducer from './form-step-reducer';
import * as actions from './form-step-actions';

const step = 2;
const state = {
  empty: 0,
  set: 2,
};

describe('FormStepReducer set reducer', () => {
  it('Should return the initial state', () => {
    expect(FormStepReducer(undefined, {})).toEqual(state.empty);
  });

  it('Should handle INCREMENT_FORM_STEP', () => {
    expect(FormStepReducer(undefined, {
      step,
      type: actions.INCREMENT_FORM_STEP,
    })).toEqual(state.set);
  });

  it('Should handle CLEAR_FORM_STEP', () => {
    expect(FormStepReducer(undefined, {
      type: actions.CLEAR_FORM_STEP,
    })).toEqual(state.empty);
  });
});
