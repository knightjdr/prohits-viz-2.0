import {
  SAVE_IMAGE_TYPE,
  SAVE_SESSION_NAME,
} from './save-actions';

const Save = (state = {
  imageType: 'svg',
  name: '',
}, action) => {
  switch (action.type) {
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
