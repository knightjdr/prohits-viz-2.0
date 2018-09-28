import { defaultState } from '../../state/set/analysis/viz-analysis-form-reducer';

const acceptedAnalysis = ['customize', 'domain', 'go', 'network'];

/* Only checking that props are objects, rather than validating every
** object's keys. */
const fillVizAnalysisForm = (userVizAnalysisForm = {}) => (
  acceptedAnalysis.reduce((accum, analysis) => {
    const newProp = {};
    if (
      Object.prototype.hasOwnProperty.call(userVizAnalysisForm, analysis) &&
      Object.prototype.toString.call(userVizAnalysisForm[analysis]) === '[object Object]'
    ) {
      newProp[analysis] = userVizAnalysisForm[analysis];
    } else {
      newProp[analysis] = defaultState[analysis];
    }
    return {
      ...accum,
      ...newProp,
    };
  }, {})
);

export default fillVizAnalysisForm;
