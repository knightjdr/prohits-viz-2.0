import SettingsSelector from './settings-selector';

const state = {
  settings: {
    current: {
      imageType: 'test',
    },
  },
};

describe('Settings selector', () => {
  it('should return a specified setting', () => {
    expect(SettingsSelector(state, 'imageType')).toBe('test');
  });
});
