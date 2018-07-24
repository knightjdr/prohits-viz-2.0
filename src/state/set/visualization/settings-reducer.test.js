import SettingsReducer from './settings-reducer';
import * as actions from './settings-actions';
import * as fileActions from '../interactive-file-actions';

const DefaultState = {
  current: {},
  default: {},
  reset: false,
};

describe('SettingsReducer set reducer', () => {
  it('should return a default initial state', () => {
    expect(SettingsReducer(undefined, {})).toEqual(DefaultState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE', () => {
    const expectedState = {
      ...DefaultState,
    };
    expect(SettingsReducer(undefined, {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE', () => {
    const expectedState = {
      current: { fillColor: 'greenBlack' },
      default: { fillColor: 'blueBlack' },
      reset: false,
    };
    expect(SettingsReducer(undefined, {
      file: {
        settings: {
          current: { fillColor: 'greenBlack' },
          default: { fillColor: 'blueBlack' },
        },
      },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    })).toEqual(expectedState);
  });

  it('should handle RESET_SETTINGS', () => {
    const expectedState = {
      ...DefaultState,
      reset: true,
    };
    expect(SettingsReducer(undefined, {
      type: actions.RESET_SETTINGS,
    })).toEqual(expectedState);
  });

  it('should handle UPDATE_SETTING', () => {
    const expectedState = {
      ...DefaultState,
      current: {
        ...DefaultState.current,
        imageType: 'test',
      },
      reset: false,
    };
    expect(SettingsReducer(undefined, {
      setting: 'imageType',
      type: actions.UPDATE_SETTING,
      value: 'test',
    })).toEqual(expectedState);
  });
});
