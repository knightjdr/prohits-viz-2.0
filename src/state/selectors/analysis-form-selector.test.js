import AnalysisFormSelector from './analysis-form-selector';

const state = {
  empty: {},
  emptyForm: { form: {} },
  withAnalysisForm: { form: { analysisForm: { values: { field: 'test' } } } },
  withAnalysisFormNoValues: { form: { analysisForm: {} } },
};

describe('AnalysisForm selector', () => {
  it('Redux form not created', () => {
    expect(AnalysisFormSelector(state.empty)).toEqual({});
  });

  it('Redux form created but analysisForm not present', () => {
    expect(AnalysisFormSelector(state.emptyForm)).toEqual({});
  });

  it('Redux and analysisForm present, but no values set', () => {
    expect(AnalysisFormSelector(state.withAnalysisFormNoValues)).toEqual({});
  });

  it('Redux and analysisForm present, and values set', () => {
    expect(AnalysisFormSelector(state.withAnalysisForm)).toEqual({ field: 'test' });
  });
});
