import * as actions from './display-actions';
import * as fileActions from '../../interactive-file-actions';
import * as tabActions from '../../visualization/tab-actions';

export const initState = {
  floatMapRight: 50,
  floatMapTop: 100,
  plotFixed: false,
  plotTranslate: 0,
  tooltips: false,
};

const display = (state = { ...initState }, action) => {
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return { ...initState };
    case tabActions.REMOVE_TAB:
      if (action.tab === 'customize') {
        return { ...initState };
      }
      return state;
    case actions.TOGGLE_CUSTOMIZE_TOOLTIPS:
      return {
        ...state,
        tooltips: !state.tooltips,
      };
    case actions.UPDATE_CUSTOMIZE_PLOT_POSITION:
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
