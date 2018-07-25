import * as fileActions from '../interactive-file-actions';

import {
  SAVE_IMAGE_TYPE,
  SAVE_SESSION_NAME,
} from './save-actions';

const defaultState = {
  imageType: 'svg',
  name: '',
};

const Save = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...defaultState };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return { ...action.file.save };
    case SAVE_IMAGE_TYPE:
      return {
        ...state,
        imageType: action.imageType,
      };
    case SAVE_SESSION_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};
export default Save;
