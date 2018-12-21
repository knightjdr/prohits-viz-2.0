import { createSelector } from 'reselect';

const getMap = state => state.minimap;
const getMapProp = (state, prop) => state.minimap[prop];

const mapSelector = createSelector(
  [getMap],
  minimap => (
    minimap
  ),
);

export const mapSelectorProp = createSelector(
  [getMapProp],
  prop => (
    prop
  ),
);

export default mapSelector;
