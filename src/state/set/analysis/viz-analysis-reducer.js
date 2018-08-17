import * as actions from './viz-analysis-actions';

export const initState = {
  go: {
    didFail: false,
    isRunning: false,
    results: [],
  },
  type: undefined,
};

const Analysis = (state = initState, action) => {
  const newState = {};
  switch (action.type) {
    case actions.RUN_VIZ_ANALYSIS:
      newState[action.analysisType] = {
        didFail: false,
        isRunning: true,
        results: [],
      };
      return {
        ...state,
        ...newState,
      };
    case actions.SET_VIZ_ANALYSIS_TYPE:
      return {
        type: action.analysisType,
      };
    case actions.VIZ_ANALYSIS_ERROR:
      newState[action.analysisType] = {
        didFail: true,
        isRunning: false,
        results: [],
      };
      return {
        ...state,
        ...newState,
      };
    default:
      return state;
  }
};

export default Analysis;
