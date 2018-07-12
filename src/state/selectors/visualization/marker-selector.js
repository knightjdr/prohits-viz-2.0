import { createSelector } from 'reselect';

const getMarkers = state => state.markers;

const GetMarkers = createSelector(
  [getMarkers],
  markers => (
    markers
  ),
);
export default GetMarkers;
