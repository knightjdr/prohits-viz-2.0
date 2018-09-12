import { createSelector } from 'reselect';

const getCustomize = state => state.customize;
const getCustomizeProp = (state, prop) => state.customize[prop];

export const customizeDataSelector = createSelector(
  [getCustomize],
  customize => (
    customize
  ),
);

export const customizeDataPropSelector = createSelector(
  [getCustomizeProp],
  prop => (
    prop
  ),
);
