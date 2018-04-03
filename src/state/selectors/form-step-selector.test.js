import FormStepSelector from './form-step-selector';

const state = {
  formStep: 2,
};
const expectedStep = 2;

describe('FormStepSelector', () => {
  it('Should return current step', () => {
    expect(FormStepSelector(state)).toEqual(expectedStep);
  });
});
