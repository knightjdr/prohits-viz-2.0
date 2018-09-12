import * as fileActions from '../../interactive-file-actions';

import * as actions from './position-actions';

const defaultState = {
  x: 0,
  y: 0,
};

const Position = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...defaultState };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return { ...action.file.positionCustomize };
    case actions.UPDATE_CUSTOMIZE_POSITION:
      return {
        x: action.x,
        y: action.y,
      };
    default:
      return state;
  }
};

export default Position;
