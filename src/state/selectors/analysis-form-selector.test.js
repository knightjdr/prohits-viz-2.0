import AnalysisFormSelector from './analysis-form-selector';

describe('Analysis form selector', () => {
  it('should return empty object when redux form', () => {
    const currentState = {};
    const expectValue = {};
    expect(AnalysisFormSelector(currentState)).toEqual(expectValue);
  });

  it('should return empty object when redux form created but analysisForm not present', () => {
    const currentState = { form: {} };
    const expectValue = {};
    expect(AnalysisFormSelector(currentState)).toEqual(expectValue);
  });

  it('should return empty object when redux form and analysisForm present, but no values set', () => {
    const currentState = { form: { analysisForm: {} } };
    const expectValue = {};
    expect(AnalysisFormSelector(currentState)).toEqual(expectValue);
  });

  it('should return form', () => {
    const currentState = { form: { analysisForm: { values: { field: 'test' } } } };
    const expectValue = { field: 'test' };
    expect(AnalysisFormSelector(currentState)).toEqual(expectValue);
  });
});
