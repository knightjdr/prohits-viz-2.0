import * as actions from './go-actions';
import * as fileActions from '../interactive-file-actions';
import * as tabActions from '../visualization/tab-actions';

export const initState = {
  annotation: '',
};

const go = (
  state = initState,
  action,
) => {
  switch (action.type) {
    case actions.CLEAR_GO_ANNOTATION: {
      return {
        annotation: '',
      };
    }
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...initState };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return { ...action.file.go };
    case tabActions.REMOVE_TAB:
      if (action.tab === 'go') {
        return { ...initState };
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
