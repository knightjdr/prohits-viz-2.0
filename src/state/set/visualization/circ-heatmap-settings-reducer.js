import * as fileActions from '../interactive-file-actions';

export const defaultState = [];

const circHeatmapSettings = (state = defaultState, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return defaultState;
    case fileActions.PARSE_INTERACTIVE_FILE:
      return action.file.circHeatmapSettings
        ? action.file.circHeatmapSettings
        : defaultState;
    default:
      return state;
  }
};

export default circHeatmapSettings;
