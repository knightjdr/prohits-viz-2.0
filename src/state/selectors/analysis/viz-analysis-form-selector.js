import { createSelector } from 'reselect';

const getVizForm = state => state.vizanalysisform;
const getVizFormProp = (state, prop) => state.vizanalysisform[prop];

export const VizFormSelector = createSelector(
  [getVizForm],
  form => (
    form
  ),
);

export const VizFormPropSelector = createSelector(
  [getVizFormProp],
  prop => (
    prop
  ),
);
