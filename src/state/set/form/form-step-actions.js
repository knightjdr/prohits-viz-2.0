export const CLEAR_FORM_STEP = 'CLEAR_FORM_STEP';
export const INCREMENT_FORM_STEP = 'INCREMENT_FORM_STEP';

export const clearFormStep = () => ({
  type: CLEAR_FORM_STEP,
});

export const incrementFormStep = step => ({
  step: step + 1,
  type: INCREMENT_FORM_STEP,
});
