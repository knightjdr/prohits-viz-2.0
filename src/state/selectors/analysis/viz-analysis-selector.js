import { createSelector } from 'reselect';

const getVizAnalysis = state => state.vizanalysis;
const getVizAnalysisProp = (state, prop) => state.vizanalysis[prop];

export const VizAnalysisSelector = createSelector(
  [getVizAnalysis],
  analysis => (
    analysis
  ),
);

export const VizAnalysisPropSelector = createSelector(
  [getVizAnalysisProp],
  prop => (
    prop
  ),
);
