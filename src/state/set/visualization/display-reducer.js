import * as actions from './display-actions';
import * as mapActions from './map-actions';

export const defaultState = {
  floatMapRight: 10,
  floatMapTop: 10,
  height: 'auto',
  opaque: true,
  plotFixed: false,
  plotTranslate: 0,
  selectionBox: true,
  tab: 'info',
  tooltips: false,
  visible: true,
  width: 'auto',
};

const display = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case actions.CHANGE_PANEL_TAB:
      return {
        ...state,
        tab: action.tab,
      };
    case actions.RESET_MAP_POSITION:
      return {
        ...state,
        floatMapRight: 10,
        floatMapTop: 10,
      };
    case mapActions.TOGGLE_MAP_ATTACH:
      return {
        ...state,
        opaque: true,
        visible: true,
      };
    case actions.TOGGLE_MAP_OPACITY:
      return {
        ...state,
        opaque: !state.opaque,
        visible: true,
      };
    case actions.TOGGLE_MAP_VISIBILITY:
      return {
        ...state,
        opaque: true,
        visible: !state.visible,
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
    case actions.UPDATE_MAP_SIZE:
      return {
        ...state,
        height: action.height,
        width: action.width,
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

export default display;
