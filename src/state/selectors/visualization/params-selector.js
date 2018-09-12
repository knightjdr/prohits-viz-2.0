import { createSelector } from 'reselect';

const getParameters = state => state.parameters;
const getParametersProp = (state, prop) => state.parameters[prop];

export const parameterSelector = createSelector(
  [getParameters],
  parameters => (
    parameters
  ),
);

export const parameterSelectorProp = createSelector(
  [getParametersProp],
  prop => (
    prop
  ),
);
