import * as fileActions from '../interactive-file-actions';

import { SET_SEARCH_RESULTS } from './search-actions';
import { UPDATE_POSITION } from './position-actions';
import { UPDATE_ROWS } from './rows-actions';

const defaultState = {
  x: 0,
  y: 0,
};

const Position = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...defaultState };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return { ...action.file.position };
    case SET_SEARCH_RESULTS:
      return { ...action.position };
    case UPDATE_POSITION:
      return {
        x: action.x,
        y: action.y,
      };
    case UPDATE_ROWS:
      return {
        ...state,
        y: 0,
      };
    default:
      return state;
  }
};
export default Position;
