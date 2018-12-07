import * as actions from './position-actions';
import * as dataActions from './data-actions';
import * as fileActions from '../../interactive-file-actions';
import * as rowActions from './rows-actions';
import * as searchActions from '../../visualization/search-actions';
import * as tabActions from '../../visualization/tab-actions';

export const initState = {
  x: 0,
  y: 0,
};

const position = (state = { ...initState }, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...initState };
    case fileActions.PARSE_INTERACTIVE_FILE:
      return { ...action.file.positionCustomize };
    case tabActions.REMOVE_TAB:
      if (action.tab === 'customize') {
        return { ...initState };
      }
      return state;
    case dataActions.RESET_CUSTOMIZE_STATE:
      return { ...initState };
    case searchActions.SET_SEARCH_RESULTS:
      return { ...action.positionCustomize };
    case rowActions.SORT_CUSTOMIZE_STATE:
      return {
        ...state,
        y: 0,
      };
    case actions.UPDATE_CUSTOMIZE_POSITION:
      return {
        x: action.x,
        y: action.y,
      };
    default:
      return state;
  }
};

export default position;
