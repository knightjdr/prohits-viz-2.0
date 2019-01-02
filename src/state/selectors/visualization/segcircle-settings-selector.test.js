import { segCircleSettingsSelector, segCircleSettingSelector } from './segcircle-settings-selector';

const state = {
  segcircleSettings: {
    thickness: 10,
  },
};

describe('Segcircle settings selector', () => {
  it('should return all settings', () => {
    expect(segCircleSettingsSelector(state)).toEqual(state.segcircleSettings);
  });

  it('should return a specific setting', () => {
    expect(segCircleSettingSelector(state, 'thickness')).toBe(10);
  });
});
