import { createSelector } from 'reselect';

const getTabs = state => state.tabs;
const getTabsProp = (state, prop) => state.tabs[prop];

export const tabSelector = createSelector(
  [getTabs],
  tabs => (
    tabs
  ),
);

export const tabSelectorProp = createSelector(
  [getTabsProp],
  prop => (
    prop
  ),
);
