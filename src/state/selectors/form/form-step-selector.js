import { createSelector } from 'reselect';

const getFormStep = state => state.formStep;

const GetFormStep = createSelector(
  [getFormStep],
  formStep => (
    formStep
  ),
);
export default GetFormStep;
