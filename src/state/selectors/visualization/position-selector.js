import { createSelector } from 'reselect';

const getPosition = state => state.position;

const GetPosition = createSelector(
  [getPosition],
  position => (
    position
  ),
);
export default GetPosition;
