import * as actions from './display-actions';

const Display = (state = {
  floatMapRight: 50,
  floatMapTop: 100,
  plotFixed: false,
  plotTranslate: 0,
  selectionBox: true,
  tab: 'info',
  tooltips: false,
}, action) => {
  switch (action.type) {
    case actions.CHANGE_PANEL_TAB:
      return {
        ...state,
        tab: action.tab,
      };
    case actions.RESET_MAP_POSITION:
      return {
        ...state,
        floatMapRight: 20,
        floatMapTop: 100,
      };
    case actions.TOGGLE_SELECTION_BOX:
      return {
        ...state,
        selectionBox: !state.selectionBox,
        tooltips: state.selectionBox,
      };
    case actions.TOGGLE_TOOLTIPS:
      return {
        ...state,
        selectionBox: state.tooltips,
        tooltips: !state.tooltips,
      };
    case actions.UPDATE_MAP_POSITION:
      return {
        ...state,
        floatMapRight: action.right,
        floatMapTop: action.top,
      };
    case actions.UPDATE_PLOT_POSITION:
      return {
        ...state,
        plotFixed: action.fixed,
        plotTranslate: action.translate,
      };
    default:
      return state;
  }
};

export default Display;
