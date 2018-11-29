import { createSelector } from 'reselect';

const getSegCircles = state => state.segcircles;

const segCirclesSelector = createSelector(
  [getSegCircles],
  segcircles => (
    segcircles
  ),
);

export default segCirclesSelector;
