import DeepCopy from '../../../helpers/deep-copy';
import * as actions from './annotation-actions';
import * as fileActions from '../interactive-file-actions';

const Annotations = (state = {
  color: '#f44336',
  fontSize: 12,
  list: [],
  show: true,
}, action) => {
  let newList;
  switch (action.type) {
    case actions.ADD_ANNOTATION:
      return {
        ...state,
        list: [
          ...DeepCopy(state.list),
          {
            text: action.text,
            x: action.x,
            y: action.y,
          },
        ],
      };
    case actions.CLEAR_ALL_ANNOTATIONS:
      return {
        ...state,
        list: [],
      };
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {
        color: '#f44336',
        fontSize: 12,
        list: [],
        show: true,
      };
    case actions.CLEAR_LAST_ANNOTATION:
      newList = DeepCopy(state.list);
      newList.pop();
      return {
        ...state,
        list: newList,
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        color: action.file.annotations.color,
        fontSize: action.file.annotations.fontSize,
        list: DeepCopy(action.file.annotations.list),
        show: action.file.annotations.show,
      };
    case actions.SET_ANNOTATION_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case actions.SET_ANNOTATION_SIZE:
      return {
        ...state,
        fontSize: action.fontSize,
      };
    case actions.TOGGLE_ANNOTATIONS:
      return {
        ...state,
        show: !state.show,
      };
    case actions.UPDATE_ANNOTATION:
      return {
        ...state,
        list: action.list,
      };
    default:
      return state;
  }
};
export default Annotations;
