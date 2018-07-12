import DefaultState from './default-settings';
import SettingsReducer from './settings-reducer';
import * as actions from './settings-actions';

describe('SettingsReducer set reducer', () => {
  it('should return a default initial state', () => {
    expect(SettingsReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle UPDATE_SETTING', () => {
    const expectedState = {
      ...DefaultState,
      ...{ imageType: 'test' },
    };
    expect(SettingsReducer(undefined, {
      setting: 'imageType',
      type: actions.UPDATE_SETTING,
      value: 'test',
    })).toEqual(expectedState);
  });
});
