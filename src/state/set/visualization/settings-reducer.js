import {
  RESET_SETTINGS,
  UPDATE_SETTING,
} from './settings-actions';

import Default from './default-settings';

const Settings = (state = { ...Default }, action) => {
  const updateState = {};
  switch (action.type) {
    case RESET_SETTINGS:
      return {
        ...Default,
        reset: true,
      };
    case UPDATE_SETTING:
      updateState[action.setting] = action.value;
      return {
        ...state,
        ...updateState,
        reset: false,
      };
    default:
      return state;
  }
};
export default Settings;
