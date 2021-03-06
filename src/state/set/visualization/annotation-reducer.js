import deepCopy from '../../../helpers/deep-copy';
import * as actions from './annotation-actions';
import * as fileActions from '../interactive-file-actions';

export const defaultState = {
  color: '#f44336',
  fontSize: 16,
  list: [],
  show: true,
};

const Annotations = (state = defaultState, action) => {
  let newList;
  switch (action.type) {
    case actions.ADD_ANNOTATION:
      return {
        ...state,
        list: [
          ...deepCopy(state.list),
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
        fontSize: 16,
        list: [],
        show: true,
      };
    case actions.CLEAR_LAST_ANNOTATION:
      newList = deepCopy(state.list);
      newList.pop();
      return {
        ...state,
        list: newList,
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return action.file.annotations
        ? {
          color: action.file.annotations.color || defaultState.color,
          fontSize: action.file.annotations.fontSize || defaultState.fontSize,
          list: action.file.annotations.list ? deepCopy(action.file.annotations.list) : [],
          show: action.file.annotations.show,
        }
        : { ...defaultState };
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
