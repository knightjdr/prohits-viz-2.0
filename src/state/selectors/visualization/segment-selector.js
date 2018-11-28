import { createSelector } from 'reselect';

const getSegments = state => state.segments;

const segmentsSelector = createSelector(
  [getSegments],
  segments => (
    segments
  ),
);

export default segmentsSelector;
