import * as actions from './panel-actions';
import * as fileActions from '../interactive-file-actions';

const Panel = (state = false, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return false;
    case fileActions.PARSE_INTERACTIVE_FILE:
      return action.file.panel;
    case actions.TOGGLE_PANEL:
      return !state;
    default:
      return state;
  }
};

export default Panel;
