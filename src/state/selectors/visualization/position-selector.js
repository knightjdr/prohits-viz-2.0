import { createSelector } from 'reselect';

const getPosition = state => state.position;

const positionSelector = createSelector(
  [getPosition],
  position => (
    position
  ),
);
export default positionSelector;
