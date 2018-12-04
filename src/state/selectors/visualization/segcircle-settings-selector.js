import { createSelector } from 'reselect';

const getSegCircleSettings = state => state.segcircleSettings;

const getSegCircleSetting = (state, index) => state.segcircleSettings[index];

export const segCircleSettingsSelector = createSelector(
  [getSegCircleSettings],
  settings => (
    settings
  ),
);

export const segCircleSettingSelector = createSelector(
  [getSegCircleSetting],
  setting => (
    setting
  ),
);
