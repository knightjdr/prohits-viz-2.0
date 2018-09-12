import { createSelector } from 'reselect';

const getPosition = state => state.positionCustomize;

const positionCustomizeSelector = createSelector(
  [getPosition],
  position => (
    position
  ),
);

export default positionCustomizeSelector;
