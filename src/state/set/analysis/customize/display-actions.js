export const TOGGLE_CUSTOMIZE_TOOLTIPS = 'TOGGLE_CUSTOMIZE_TOOLTIPS';
export const UPDATE_CUSTOMIZE_PLOT_POSITION = 'UPDATE_CUSTOMIZE_PLOT_POSITION';

export const toggleTooltips = () => ({
  type: TOGGLE_CUSTOMIZE_TOOLTIPS,
});

export const updatePlotPosition = (fixed, translate) => ({
  fixed,
  translate,
  type: UPDATE_CUSTOMIZE_PLOT_POSITION,
});
