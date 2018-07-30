import FormStepSelector from './form-step-selector';

describe('Form step selector', () => {
  it('should return current step', () => {
    const currentState = {
      formStep: 2,
    };
    const expectedValue = 2;
    expect(FormStepSelector(currentState)).toEqual(expectedValue);
  });
});
