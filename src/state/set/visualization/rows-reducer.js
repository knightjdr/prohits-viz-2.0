import DeepCopy from '../../../helpers/deep-copy';
import { RESTORE_ROWS, UPDATE_ROWS } from './rows-actions';
import * as fileActions from '../interactive-file-actions';

const Rows = (state = {
  direction: null,
  id: null,
  list: [],
  order: [],
  sortBy: null,
}, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {
        direction: null,
        id: null,
        list: [],
        order: [],
        sortBy: null,
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        direction: action.file.rows.direction,
        id: null,
        list: DeepCopy(action.file.rows.list),
        order: [...action.file.rows.order],
        sortBy: action.file.rows.sortBy,
      };
    case RESTORE_ROWS:
      return {
        ...state,
        direction: action.direction,
        id: action.id,
        list: DeepCopy(action.list),
        sortBy: action.sortBy,
      };
    case UPDATE_ROWS:
      return {
        ...state,
        direction: action.direction,
        id: action.id,
        list: DeepCopy(action.list),
        sortBy: action.sortBy,
      };
    default:
      return state;
  }
};

export default Rows;
