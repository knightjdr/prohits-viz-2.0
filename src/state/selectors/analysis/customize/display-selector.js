import { createSelector } from 'reselect';

const getDisplay = state => state.displayCustomize;
const getDisplayProp = (state, prop) => state.displayCustomize[prop];

export const displayCustomizeSelector = createSelector(
  [getDisplay],
  display => (
    display
  ),
);

export const displayCustomizePropSelector = createSelector(
  [getDisplayProp],
  prop => (
    prop
  ),
);
