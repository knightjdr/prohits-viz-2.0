import { createSelector } from 'reselect';

const getDimensions = state => state.dimensions;

const dimensionSelector = createSelector(
  [getDimensions],
  dimensions => (
    dimensions
  ),
);
export default dimensionSelector;
