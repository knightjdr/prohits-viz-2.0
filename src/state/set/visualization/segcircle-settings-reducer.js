import * as fileActions from '../interactive-file-actions';

export const defaultState = [];

const segCircleSettings = (state = defaultState, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return defaultState;
    case fileActions.PARSE_INTERACTIVE_FILE:
      return action.file.segcircleSettings
        ? action.file.segcircleSettings
        : defaultState;
    default:
      return state;
  }
};

export default segCircleSettings;
