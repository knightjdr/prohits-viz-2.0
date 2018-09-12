export const UPDATE_CUSTOMIZE_PLOT_POSITION = 'UPDATE_CUSTOMIZE_PLOT_POSITION';

export const updatePlotPosition = (fixed, translate) => ({
  fixed,
  translate,
  type: UPDATE_CUSTOMIZE_PLOT_POSITION,
});
