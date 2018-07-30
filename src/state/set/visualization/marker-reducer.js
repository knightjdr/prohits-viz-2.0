import DeepCopy from '../../../helpers/deep-copy';
import * as fileActions from '../interactive-file-actions';

import {
  ADD_MARKER,
  CLEAR_ALL_MARKERS,
  CLEAR_LAST_MARKER,
  SET_MARKER_COLOR,
  TOGGLE_RECORD_MARKER,
} from './marker-actions';

const Markers = (state = {
  color: '#000000',
  list: [],
  record: false,
}, action) => {
  let newList;
  switch (action.type) {
    case ADD_MARKER:
      return {
        ...state,
        list: [
          ...DeepCopy(state.list),
          {
            height: action.height,
            width: action.width,
            x: action.x,
            y: action.y,
          },
        ],
      };
    case CLEAR_ALL_MARKERS:
      return {
        ...state,
        list: [],
      };
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {
        color: '#000000',
        list: [],
        record: false,
      };
    case CLEAR_LAST_MARKER:
      newList = DeepCopy(state.list);
      newList.pop();
      return {
        ...state,
        list: newList,
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        color: action.file.markers.color,
        list: DeepCopy(action.file.markers.list),
        record: action.file.markers.record,
      };
    case SET_MARKER_COLOR:
      return {
        ...state,
        ...{
          color: action.color,
        },
      };
    case TOGGLE_RECORD_MARKER:
      return {
        ...state,
        ...{
          record: !state.record,
        },
      };
    default:
      return state;
  }
};
export default Markers;
