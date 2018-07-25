import * as fileActions from '../interactive-file-actions';

import {
  RESET_SETTINGS,
  UPDATE_SETTING,
} from './settings-actions';

const Settings = (state = {
  current: {},
  default: {},
  reset: false,
}, action) => {
  const updateState = {};
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {
        current: {},
        default: {},
        reset: false,
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        current: { ...action.file.settings.current },
        default: { ...action.file.settings.default },
        reset: false,
      };
    case RESET_SETTINGS:
      return {
        ...state,
        current: { ...state.default },
        reset: true,
      };
    case UPDATE_SETTING:
      updateState[action.setting] = action.value;
      return {
        ...state,
        current: {
          ...state.current,
          ...updateState,
        },
        reset: false,
      };
    default:
      return state;
  }
};
export default Settings;
