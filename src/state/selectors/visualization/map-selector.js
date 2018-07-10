import { createSelector } from 'reselect';

const getMap = state => state.minimap;

const GetMap = createSelector(
  [getMap],
  minimap => (
    minimap
  ),
);
export default GetMap;
