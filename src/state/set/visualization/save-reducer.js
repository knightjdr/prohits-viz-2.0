import * as actions from './save-actions';
import * as fileActions from '../interactive-file-actions';
import * as asyncActions from '../../post/save-image-thunk';

const defaultState = {
  didSave: false,
  error: false,
  imageType: 'svg',
  isSaving: false,
  name: '',
  task: null,
};

const save = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...defaultState };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return { ...action.file.save };
    case 'SAVED_IMAGE':
      return {
        ...state,
        didSave: true,
        error: false,
        isSaving: false,
        task: action.task,
      };
    case asyncActions.SAVE_ERROR:
      return {
        ...state,
        didSave: false,
        error: true,
        isSaving: false,
        task: null,
      };
    case asyncActions.SAVING_IMAGE:
      return {
        ...state,
        didSave: false,
        error: false,
        isSaving: true,
        task: null,
      };
    case actions.SAVE_IMAGE_TYPE:
      return {
        ...state,
        imageType: action.imageType,
      };
    case actions.SAVE_SESSION_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};
export default save;
