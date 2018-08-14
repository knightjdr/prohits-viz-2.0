import { createSelector } from 'reselect';

const getTabs = state => state.tabs;
const getTabsProp = (state, prop) => state.tabs[prop];

export const TabSelector = createSelector(
  [getTabs],
  tabs => (
    tabs
  ),
);

export const TabSelectorProp = createSelector(
  [getTabsProp],
  prop => (
    prop
  ),
);
