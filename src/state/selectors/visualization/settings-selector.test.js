import SettingsSelector from './settings-selector';

describe('Settings selector', () => {
  it('should return a specified setting', () => {
    const state = {
      settings: {
        current: {
          imageType: 'test',
        },
      },
    };
    const expectedValue = 'test';
    expect(SettingsSelector(state, 'imageType')).toBe(expectedValue);
  });
});
