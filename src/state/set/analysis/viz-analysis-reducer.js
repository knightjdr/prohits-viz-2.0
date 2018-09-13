import * as actions from './viz-analysis-actions';
import * as fileActions from '../interactive-file-actions';
import * as tabActions from '../visualization/tab-actions';

export const initState = {
  domain: {
    didFail: false,
    isRunning: false,
    results: [],
  },
  go: {
    didFail: false,
    isRunning: false,
    results: [],
  },
  network: {
    didFail: false,
    isRunning: false,
    results: [],
  },
  type: undefined,
};

const Analysis = (state = initState, action) => {
  let newState = {};
  switch (action.type) {
    case fileActions.CLEAR_INTERACTIVE_FILE:
      return initState;
    case fileActions.PARSE_INTERACTIVE_FILE:
      return { ...action.file.vizanalysis };
    case tabActions.REMOVE_TAB:
      if (action.tab !== 'customize') {
        newState = state;
        newState[action.tab] = { ...initState[action.tab] };
        return newState;
      }
      return state;
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
        ...state,
        type: action.analysisType,
      };
    case actions.SET_VIZ_ANALYSIS_RESULTS:
      newState[action.analysisType] = {
        didFail: false,
        isRunning: false,
        results: action.results,
      };
      return {
        ...state,
        ...newState,
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
