import { VizAnalysisSelector, VizAnalysisPropSelector } from './viz-analysis-selector';

const state = {
  vizanalysis: {
    type: undefined,
  },
};

describe('Viz analysis selector', () => {
  it('should return an object of analysis settings', () => {
    expect(VizAnalysisSelector(state)).toEqual(state.vizanalysis);
  });

  it('should return a specific prop analysis state', () => {
    expect(VizAnalysisPropSelector(state, 'type')).toBe(state.vizanalysis.type);
  });
});
