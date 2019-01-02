import { availablePlotsSelector, availablePlotSelector } from './available-plots-selector';

const state = {
  availablePlots: [
    'plot1',
    'plot2',
  ],
};

describe('Available plots selector', () => {
  it('should return all plot', () => {
    expect(availablePlotsSelector(state)).toEqual(state.availablePlots);
  });

  it('should return a specific plot by index', () => {
    expect(availablePlotSelector(state, 1)).toBe('plot2');
  });
});
