import { createSelector } from 'reselect';

const getSettings = state => state.settings.current;
const getSettingsProp = (state, property) => state.settings.current[property];

export const settingSelector = createSelector(
  [getSettings],
  setting => (
    setting
  ),
);

export const settingSelectorProp = createSelector(
  [getSettingsProp],
  setting => (
    setting
  ),
);
