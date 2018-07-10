import SettingsSelector from './settings-selector';

const state = {
  settings: {
    imageType: 'test',
  },
};

describe('Settings selector', () => {
  it('should return a specified setting', () => {
    expect(SettingsSelector(state, 'imageType')).toBe('test');
  });
});
