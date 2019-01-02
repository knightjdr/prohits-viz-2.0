import deepCopy from '../../../helpers/deep-copy';
import * as actions from './rows-actions';
import * as fileActions from '../interactive-file-actions';

export const defaultState = {
  direction: null,
  id: null,
  list: [],
  order: [],
  sortBy: null,
};

const rows = (state = defaultState, action) => {
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
      return action.file.rows
        ? {
          direction: action.file.rows.direction,
          id: null,
          list: deepCopy(action.file.rows.list),
          order: [...action.file.rows.order],
          sortBy: action.file.rows.sortBy,
        }
        : { ...defaultState };
    case actions.RESTORE_ROWS:
      return {
        ...state,
        direction: action.direction,
        id: action.id,
        list: deepCopy(action.list),
        sortBy: action.sortBy,
      };
    case actions.UPDATE_ROWS:
      return {
        ...state,
        direction: action.direction,
        id: action.id,
        list: deepCopy(action.list),
        sortBy: action.sortBy,
      };
    default:
      return state;
  }
};

export default rows;
