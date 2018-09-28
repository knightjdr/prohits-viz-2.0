import { defaultState } from '../../state/set/analysis/viz-analysis-reducer';

const acceptedAnalysis = ['domain', 'go', 'network'];

const fillVizAnalysis = (userVizAnalysis = {}) => (
  acceptedAnalysis.reduce((accum, analysis) => {
    const newProp = {};
    if (Object.prototype.hasOwnProperty.call(userVizAnalysis, analysis)) {
      const { didFail, results } = userVizAnalysis[analysis];
      newProp[analysis] = {};
      newProp[analysis].didFail = typeof didFail === 'boolean' ? didFail : defaultState[analysis].didFail;
      newProp[analysis].isRunning = defaultState[analysis].isRunning;
      newProp[analysis].results = Array.isArray(results) ? results : defaultState[analysis].results;
    } else {
      newProp[analysis] = defaultState[analysis];
    }
    return {
      ...accum,
      ...newProp,
    };
  }, {})
);

export default fillVizAnalysis;
