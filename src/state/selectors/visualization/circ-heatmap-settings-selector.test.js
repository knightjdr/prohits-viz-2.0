import { circHeatmapSettingsSelector, circHeatmapSettingSelector } from './circ-heatmap-settings-selector';

const state = {
  circHeatmapSettings: {
    thickness: 10,
  },
};

describe('CircHeatmap settings selector', () => {
  it('should return all settings', () => {
    expect(circHeatmapSettingsSelector(state)).toEqual(state.circHeatmapSettings);
  });

  it('should return a specific setting', () => {
    expect(circHeatmapSettingSelector(state, 'thickness')).toBe(10);
  });
});
