import * as actions from './tab-actions';
import * as fileActions from '../interactive-file-actions';

export const defaultState = {
  available: ['main'],
  selected: 'main',
  show: false,
};

const Tabs = (state = defaultState, action) => {
  let newTabs;
  switch (action.type) {
    case actions.ADD_TAB:
      newTabs = !state.available.includes(action.tab) ?
        [...state.available, action.tab] : state.available;
      return {
        available: newTabs,
        selected: newTabs[newTabs.indexOf(action.tab)],
        show: true,
      };
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return defaultState;
    case fileActions.PARSE_INTERACTIVE_FILE:
      return {
        available: [...action.file.tabs.available],
        selected: action.file.tabs.selected,
        show: action.file.tabs.show,
      };
    case actions.REMOVE_TAB:
      newTabs = state.available.filter(item => item !== action.tab);
      return {
        available: newTabs,
        selected: action.tab !== state.selected ? state.selected : 'main',
        show: newTabs.length > 1,
      };
    case actions.SET_TAB:
      return {
        ...state,
        selected: action.tab,
      };
    default:
      return state;
  }
};

export default Tabs;
