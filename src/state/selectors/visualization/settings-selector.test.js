import { settingSelector, settingSelectorProp } from './settings-selector';

const state = {
  settings: {
    current: {
      imageType: 'test',
    },
  },
};

describe('Settings selector', () => {
  it('should return settings', () => {
    expect(settingSelector(state, 'imageType')).toBe(state.settings.current);
  });

  it('should return a specified setting', () => {
    const expectedValue = 'test';
    expect(settingSelectorProp(state, 'imageType')).toBe(expectedValue);
  });
});
