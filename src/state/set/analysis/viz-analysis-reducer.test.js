import * as actions from './viz-analysis-actions';
import * as fileActions from '../interactive-file-actions';
import * as tabActions from '../visualization/tab-actions';

import analysisReducer, { defaultState } from './viz-analysis-reducer';

describe('Analysis set reducer', () => {
  it('should return the initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(analysisReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLEAR_INTERACTIVE_FILE action', () => {
    const action = {
      type: fileActions.CLEAR_INTERACTIVE_FILE,
    };
    const expectedState = defaultState;
    expect(analysisReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: { vizanalysis: { field: 'aaa' } },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = { field: 'aaa' };
    expect(analysisReducer(undefined, action)).toEqual(expectedState);
  });

  describe('when removing a tab', () => {
    const currentState = {
      ...defaultState,
      go: {
        didFail: true,
        isRunning: false,
        results: {},
      },
    };

    it('should reset the state for the tab when the tab is not "customize"', () => {
      const action = {
        tab: 'go',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = defaultState;
      expect(analysisReducer(currentState, action)).toEqual(expectedState);
    });

    it('should not reset any state when the tab is "customize"', () => {
      const action = {
        tab: 'customize',
        type: tabActions.REMOVE_TAB,
      };
      const expectedState = currentState;
      expect(analysisReducer(currentState, action)).toEqual(expectedState);
    });
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
        results: {},
      },
      type: 'go',
    };
    expect(analysisReducer(currentState, action)).toEqual(expectedState);
  });

  it('should handle SET_VIZ_ANALYSIS_TYPE action', () => {
    const action = {
      analysisType: 'go',
      type: actions.SET_VIZ_ANALYSIS_TYPE,
    };
    const expectedState = {
      ...defaultState,
      type: 'go',
    };
    expect(analysisReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_VIZ_ANALYSIS_RESULTS action', () => {
    const action = {
      analysisType: 'go',
      results: { source: [] },
      type: actions.SET_VIZ_ANALYSIS_RESULTS,
    };
    const expectedState = {
      ...defaultState,
      go: {
        didFail: false,
        isRunning: false,
        results: { source: [] },
      },
    };
    expect(analysisReducer(undefined, action)).toEqual(expectedState);
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
        results: {},
      },
      type: 'go',
    };
    expect(analysisReducer(currentState, action)).toEqual(expectedState);
  });
});
