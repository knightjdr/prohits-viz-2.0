import { VizFormSelector, VizFormPropSelector } from './viz-analysis-form-selector';

const state = {
  vizanalysisform: {
    go: {
      advanced_options_on: true,
      domain_size_type: 'annotated',
      hierfiltering: '',
    },
  },
};

describe('Viz analysis form selector', () => {
  it('should return an object of form values', () => {
    expect(VizFormSelector(state)).toEqual(state.vizanalysisform);
  });

  it('should return a specific prop from form state', () => {
    expect(VizFormPropSelector(state, 'go')).toBe(state.vizanalysisform.go);
  });
});
