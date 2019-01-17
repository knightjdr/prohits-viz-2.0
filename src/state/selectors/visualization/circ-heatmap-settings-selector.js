import { createSelector } from 'reselect';

const getCircHeatmapSettings = state => state.circHeatmapSettings;

const getCircHeatmapSetting = (state, index) => state.circHeatmapSettings[index];

export const circHeatmapSettingsSelector = createSelector(
  [getCircHeatmapSettings],
  settings => (
    settings
  ),
);

export const circHeatmapSettingSelector = createSelector(
  [getCircHeatmapSetting],
  setting => (
    setting
  ),
);
