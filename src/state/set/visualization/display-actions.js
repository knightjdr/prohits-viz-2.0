export const CHANGE_PANEL_TAB = 'CHANGE_PANEL_TAB';
export const RESET_MAP_POSITION = 'RESET_MAP_POSITION';
export const TOGGLE_MAP_OPACITY = 'TOGGLE_MAP_OPACITY';
export const TOGGLE_MAP_VISIBILITY = 'TOGGLE_MAP_VISIBILITY';
export const TOGGLE_SELECTION_BOX = 'TOGGLE_SELECTION_BOX';
export const TOGGLE_TOOLTIPS = 'TOGGLE_TOOLTIPS';
export const UPDATE_MAP_POSITION = 'UPDATE_MAP_POSITION';
export const UPDATE_MAP_SIZE = 'UPDATE_MAP_SIZE';
export const UPDATE_PLOT_POSITION = 'UPDATE_PLOT_POSITION';

export const changePanelTab = tab => ({
  tab,
  type: CHANGE_PANEL_TAB,
});

export const resetMapPosition = () => ({
  type: RESET_MAP_POSITION,
});

export const toggleMapOpacity = () => ({
  type: TOGGLE_MAP_OPACITY,
});

export const toggleMapVisibility = () => ({
  type: TOGGLE_MAP_VISIBILITY,
});

export const toggleSelectionBox = () => ({
  type: TOGGLE_SELECTION_BOX,
});

export const toggleTooltips = () => ({
  type: TOGGLE_TOOLTIPS,
});

export const updateMapPosition = (right, top) => ({
  right,
  top,
  type: UPDATE_MAP_POSITION,
});

export const updateMapSize = (height, width) => ({
  height,
  width,
  type: UPDATE_MAP_SIZE,
});

export const updatePlotPosition = (fixed, translate) => ({
  fixed,
  translate,
  type: UPDATE_PLOT_POSITION,
});
