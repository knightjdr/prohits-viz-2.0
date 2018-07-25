import * as fileActions from '../interactive-file-actions';

const Parameters = (state = {}, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return {};
    case fileActions.PARSE_INTERACTIVE_FILE:
      return { ...action.file.params };
    default:
      return state;
  }
};
export default Parameters;
