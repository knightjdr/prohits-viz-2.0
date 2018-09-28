import vizAnalysisForms, { defaultState } from './viz-analysis-form-reducer';
import * as actions from './viz-analysis-form-actions';
import * as fileActions from '../interactive-file-actions';

describe('Analysis GO form set reducer', () => {
  it('should return initial state', () => {
    const action = {};
    const expectedState = defaultState;
    expect(vizAnalysisForms(undefined, action)).toEqual(expectedState);
  });

  it('should handle PARSE_INTERACTIVE_FILE action', () => {
    const action = {
      file: { vizanalysisform: { field: 'aaa' } },
      type: fileActions.PARSE_INTERACTIVE_FILE,
    };
    const expectedState = { field: 'aaa' };
    expect(vizAnalysisForms(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_CUSTOMIZE_PARAMETER action', () => {
    const action = {
      setting: { orderBy: 'column' },
      type: actions.SET_CUSTOMIZE_PARAMETER,
    };
    const expectedState = {
      ...defaultState,
      customize: {
        ...defaultState.customize,
        orderBy: 'column',
      },
    };
    expect(vizAnalysisForms(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_GO_PARAMETER action', () => {
    const action = {
      setting: { advanced_options_on: false },
      type: actions.SET_GO_PARAMETER,
    };
    const expectedState = {
      ...defaultState,
      go: {
        ...defaultState.go,
        advanced_options_on: false,
      },
    };
    expect(vizAnalysisForms(undefined, action)).toEqual(expectedState);
  });
});
