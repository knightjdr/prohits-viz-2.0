import {
  CLEAR_INTERACTIVE_FILE,
  SET_INTERACTIVE_FILE,
} from './interactive-file-actions';

const InteractiveFile = (state = null, action) => {
  switch (action.type) {
    case CLEAR_INTERACTIVE_FILE:
      return null;
    case SET_INTERACTIVE_FILE:
      return action.file;
    default:
      return state;
  }
};
export default InteractiveFile;
