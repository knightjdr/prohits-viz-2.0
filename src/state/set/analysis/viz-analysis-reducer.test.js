import * as actions from './viz-analysis-actions';

import AnalysisReducer, { initState } from './viz-analysis-reducer';

describe('Analysis set reducer', () => {
  it('should return the initial state', () => {
    const action = {};
    const expectedState = initState;
    expect(AnalysisReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle RUN_VIZ_ANALYSIS action', () => {
    const action = {
      analysisType: 'go',
      type: actions.RUN_VIZ_ANALYSIS,
    };
    const currentState = {
      type: 'go',
    };
    const expectedState = {
      go: {
        didFail: false,
        isRunning: true,
        results: [],
      },
      type: 'go',
    };
    expect(AnalysisReducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle SET_VIZ_ANALYSIS_TYPE action', () => {
    const action = {
      analysisType: 'go',
      type: actions.SET_VIZ_ANALYSIS_TYPE,
    };
    const expectedState = {
      type: 'go',
    };
    expect(AnalysisReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle VIZ_ANALYSIS_ERROR action', () => {
    const action = {
      analysisType: 'go',
      type: actions.VIZ_ANALYSIS_ERROR,
    };
    const currentState = {
      type: 'go',
    };
    const expectedState = {
      go: {
        didFail: true,
        isRunning: false,
        results: [],
      },
      type: 'go',
    };
    expect(AnalysisReducer(currentState, action)).toEqual(expectedState);
  });
});
