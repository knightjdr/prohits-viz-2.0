import { createSelector } from 'reselect';

const getDimensions = state => state.dimensions;

const GetDimensions = createSelector(
  [getDimensions],
  dimensions => (
    dimensions
  ),
);
export default GetDimensions;
