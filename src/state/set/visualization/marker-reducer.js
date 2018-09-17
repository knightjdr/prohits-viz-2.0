import deepCopy from '../../../helpers/deep-copy';
import * as fileActions from '../interactive-file-actions';
import * as actions from './marker-actions';

const Markers = (state = {
  color: '#000000',
  list: [],
  record: false,
  show: true,
}, action) => {
  let newList;
  switch (action.type) {
    case actions.ADD_MARKER:
      return {
        ...state,
        list: [
          ...deepCopy(state.list),
          {
            height: action.height,
            width: action.width,
            x: action.x,
            y: action.y,
          },
        ],
      };
    case actions.CLEAR_ALL_MARKERS:
      return {
        ...state,
        list: [],
      };
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {
        color: '#000000',
        list: [],
        record: false,
        show: true,
      };
    case actions.CLEAR_LAST_MARKER:
      newList = deepCopy(state.list);
      newList.pop();
      return {
        ...state,
        list: newList,
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        color: action.file.markers.color,
        list: deepCopy(action.file.markers.list),
        record: action.file.markers.record,
      };
    case actions.SET_MARKER_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case actions.TOGGLE_MARKERS:
      return {
        ...state,
        show: !state.show,
      };
    case actions.TOGGLE_RECORD_MARKER:
      return {
        ...state,
        record: !state.record,
      };
    default:
      return state;
  }
};
export default Markers;
