import { createSelector } from 'reselect';

const getPlot = state => state.plot;

const plotSelector = createSelector(
  [getPlot],
  plot => (
    plot
  ),
);

export default plotSelector;
