import { SET_REFERENCE } from './columns-actions';
import * as fileActions from '../interactive-file-actions';

export const defaultState = {
  ref: null,
  names: [],
};

const Columns = (state = defaultState, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {
        ref: null,
        names: [],
      };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return action.file.columns
        ? {
          ref: action.file.columns.ref,
          names: [...action.file.columns.names],
        }
        : { ...defaultState };
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
