import SettingsResetSelector from './settings-reset-selector';

describe('Settings reset selector', () => {
  it('should return the reset boolean from settings', () => {
    const state = {
      settings: {
        reset: false,
      },
    };
    expect(SettingsResetSelector(state)).toBeFalsy();
  });
});
