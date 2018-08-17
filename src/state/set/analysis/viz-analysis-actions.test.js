import * as actions from './viz-analysis-actions';

describe('Viz analysis set actions', () => {
  it('should dispatch an action to run the analysis', () => {
    const expectedAction = {
      analysisType: 'go',
      type: actions.RUN_VIZ_ANALYSIS,
    };
    expect(actions.runAnalysis('go')).toEqual(expectedAction);
  });

  it('should dispatch an action to set the analysis type', () => {
    const expectedAction = {
      analysisType: 'go',
      type: actions.SET_VIZ_ANALYSIS_TYPE,
    };
    expect(actions.setAnalysisType('go')).toEqual(expectedAction);
  });

  it('should dispatch an action to report an error', () => {
    const expectedAction = {
      analysisType: 'go',
      type: actions.VIZ_ANALYSIS_ERROR,
    };
    expect(actions.analysisError('go')).toEqual(expectedAction);
  });
});
