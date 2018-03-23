import { createSelector } from 'reselect';

const getAnalysisForm = (state) => {
  if (
    state.form.analysisForm &&
    state.form.analysisForm.values
  ) {
    return state.form.analysisForm.values;
  }
  return {};
};

const GetAnalysisForm = createSelector(
  [getAnalysisForm],
  analysisForm => (
    analysisForm
  ),
);
export default GetAnalysisForm;
