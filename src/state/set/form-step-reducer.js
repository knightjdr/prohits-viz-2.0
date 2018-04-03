import {
  CLEAR_FORM_STEP,
  INCREMENT_FORM_STEP,
} from './form-step-actions';

const FormStep = (state = 0, action) => {
  switch (action.type) {
    case CLEAR_FORM_STEP:
      return 0;
    case INCREMENT_FORM_STEP:
      return action.step;
    default:
      return state;
  }
};
export default FormStep;
