import { createSelector } from 'reselect';

const getParameters = state => state.parameters;
const getParametersProp = (state, prop) => state.parameters[prop];

export const ParametersSelector = createSelector(
  [getParameters],
  parameters => (
    parameters
  ),
);

export const ParametersSelectorProp = createSelector(
  [getParametersProp],
  prop => (
    prop
  ),
);
