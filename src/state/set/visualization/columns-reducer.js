import { SET_REFERENCE } from './columns-actions';
import * as fileActions from '../interactive-file-actions';

const Columns = (state = {
  ref: null,
  names: [],
}, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {
        ref: null,
        names: [],
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        ref: action.file.columns.ref,
        names: [...action.file.columns.names],
      };
    case SET_REFERENCE:
      return {
        ref: action.ref,
        names: [...state.names],
      };
    default:
      return state;
  }
};

export default Columns;