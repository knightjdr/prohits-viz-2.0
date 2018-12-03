import { createSelector } from 'reselect';

const getSegCircles = state => state.segcircles;

const getSegCirclesProp = (state, prop) => state.segcircles[prop];

export const segCirclesSelectorProp = createSelector(
  [getSegCirclesProp],
  prop => (
    prop
  ),
);

export const segCirclesSelector = createSelector(
  [getSegCircles],
  segcircles => (
    segcircles
  ),
);
