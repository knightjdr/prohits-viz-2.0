import { createSelector } from 'reselect';

const getDisplay = state => state.display;
const getDisplayProp = (state, prop) => state.display[prop];

export const DisplaySelector = createSelector(
  [getDisplay],
  display => (
    display
  ),
);

export const DisplayPropSelector = createSelector(
  [getDisplayProp],
  prop => (
    prop
  ),
);
