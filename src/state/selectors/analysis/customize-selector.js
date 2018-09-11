import { createSelector } from 'reselect';

const getCustomize = state => state.customize;
const getCustomizeProp = (state, prop) => state.customize[prop];

export const customizeSelector = createSelector(
  [getCustomize],
  customize => (
    customize
  ),
);

export const customizePropSelector = createSelector(
  [getCustomizeProp],
  prop => (
    prop
  ),
);
