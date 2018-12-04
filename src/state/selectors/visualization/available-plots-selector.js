import { createSelector } from 'reselect';

const getAvailablePlots = state => state.availablePlots;

const getAvailablePlot = (state, index) => state.availablePlots[index];

export const availablePlotsSelector = createSelector(
  [getAvailablePlots],
  plots => (
    plots
  ),
);

export const availablePlotSelector = createSelector(
  [getAvailablePlot],
  plot => (
    plot
  ),
);
