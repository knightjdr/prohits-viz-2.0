import { createSelector } from 'reselect';

const getDisplay = state => state.display;
const getDisplayProp = (state, prop) => state.display[prop];

export const displaySelector = createSelector(
  [getDisplay],
  display => (
    display
  ),
);

export const displayPropSelector = createSelector(
  [getDisplayProp],
  prop => (
    prop
  ),
);
