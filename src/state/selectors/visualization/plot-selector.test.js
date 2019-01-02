import plotSelector from './plot-selector';

const state = {
  plot: 'plot1',
};

describe('Plot selector', () => {
  it('should return plot', () => {
    expect(plotSelector(state)).toBe('plot1');
  });
});
