import * as actions from './display-actions';

const Display = (state = {
  floatMapRight: 50,
  floatMapTop: 100,
  plotFixed: false,
  plotTranslate: 0,
}, action) => {
  switch (action.type) {
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

export default Display;
