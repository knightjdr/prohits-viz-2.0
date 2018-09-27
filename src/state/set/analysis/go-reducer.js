import * as actions from './go-actions';
import * as fileActions from '../interactive-file-actions';
import * as tabActions from '../visualization/tab-actions';

export const defaultState = {
  annotation: '',
};

const go = (
  state = defaultState,
  action,
) => {
  switch (action.type) {
    case actions.CLEAR_GO_ANNOTATION: {
      return {
        annotation: '',
      };
    }
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...defaultState };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return { ...action.file.go };
    case tabActions.REMOVE_TAB:
      if (action.tab === 'go') {
        return { ...defaultState };
      }
      return state;
    case actions.SET_GO_ANNOTATION:
      return {
        annotation: action.text,
      };
    default:
      return state;
  }
};

export default go;
