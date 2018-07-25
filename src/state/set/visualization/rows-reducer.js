import DeepCopy from '../../../helpers/deep-copy';
import { UPDATE_ROWS } from './rows-actions';
import * as fileActions from '../interactive-file-actions';

const Rows = (state = {
  direction: null,
  list: [],
  sortBy: null,
}, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {
        direction: null,
        list: [],
        sortBy: null,
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        direction: action.file.rows.direction,
        list: DeepCopy(action.file.rows.list),
        sortBy: action.file.rows.sortBy,
      };
    case UPDATE_ROWS:
      return {
        direction: action.direction,
        list: DeepCopy(action.list),
        sortBy: action.sortBy,
      };
    default:
      return state;
  }
};

export default Rows;
