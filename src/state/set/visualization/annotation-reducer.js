import DeepCopy from '../../../helpers/deep-copy';
import * as fileActions from '../interactive-file-actions';

import {
  ADD_ANNOTATION,
  CLEAR_ALL_ANNOTATIONS,
  CLEAR_LAST_ANNOTATION,
  SET_ANNOTATION_COLOR,
  TOGGLE_MOVE_ANNOTATION,
} from './annotation-actions';

const Annotations = (state = {
  color: '#f44336',
  list: [],
  move: false,
}, action) => {
  let newList;
  switch (action.type) {
    case ADD_ANNOTATION:
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
    case CLEAR_ALL_ANNOTATIONS:
      return {
        ...state,
        list: [],
      };
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {
        color: '#f44336',
        list: [],
        move: false,
      };
    case CLEAR_LAST_ANNOTATION:
      newList = DeepCopy(state.list);
      newList.pop();
      return {
        ...state,
        list: newList,
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        color: action.file.annotations.color,
        list: DeepCopy(action.file.annotations.list),
        move: action.file.annotations.move,
      };
    case SET_ANNOTATION_COLOR:
      return {
        ...state,
        ...{
          color: action.color,
        },
      };
    case TOGGLE_MOVE_ANNOTATION:
      return {
        ...state,
        ...{
          move: !state.move,
        },
      };
    default:
      return state;
  }
};
export default Annotations;
