import SettingsResetSelector from './settings-reset-selector';

const state = {
  settings: {
    reset: false,
  },
};

describe('Settings reset selector', () => {
  it('should return the specified setting', () => {
    expect(SettingsResetSelector(state)).toBeFalsy();
  });
});
