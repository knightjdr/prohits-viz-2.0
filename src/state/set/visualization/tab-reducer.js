import * as actions from './tab-actions';

const Tabs = (state = {
  available: ['main'],
  selected: 'main',
  show: false,
}, action) => {
  let newTabs;
  switch (action.type) {
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
