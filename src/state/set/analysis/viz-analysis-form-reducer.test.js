import VizAnalysisForms, { initState } from './viz-analysis-form-reducer';
import * as actions from './viz-analysis-form-actions';

describe('Analysis GO form set reducer', () => {
  it('should return initial state', () => {
    const action = {};
    const expectedState = initState;
    expect(VizAnalysisForms(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_GO_PARAMETER action', () => {
    const action = {
      setting: { advanced_options_on: false },
      type: actions.SET_GO_PARAMETER,
    };
    const expectedState = {
      ...initState,
      go: {
        ...initState.go,
        advanced_options_on: false,
      },
    };
    expect(VizAnalysisForms(undefined, action)).toEqual(expectedState);
  });
});
