import * as actions from './plot-actions';
import * as fileActions from '../interactive-file-actions';

export const defaultState = {};

const plot = (state = defaultState, action) => {
  switch (action.type) {
    case actions.CHANGE_PLOT:
      return action.plot;
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return defaultState;
    case fileActions.PARSE_INTERACTIVE_FILE:
      return action.file.plot
        ? action.file.plot
        : { ...defaultState };
    default:
      return state;
  }
};

export default plot;
