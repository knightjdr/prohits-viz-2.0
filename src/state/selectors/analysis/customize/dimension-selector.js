import { createSelector } from 'reselect';

const getDimensions = state => state.dimensionsCustomize;

const dimensionCustomizeSelector = createSelector(
  [getDimensions],
  dimensions => (
    dimensions
  ),
);

export default dimensionCustomizeSelector;
