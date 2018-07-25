export const ADD_MARKER = 'ADD_MARKER';
export const CLEAR_ALL_MARKERS = 'CLEAR_ALL_MARKERS';
export const CLEAR_LAST_MARKER = 'CLEAR_LAST_MARKER';
export const SET_MARKER_COLOR = 'SET_MARKER_COLOR';
export const TOGGLE_RECORD_MARKER = 'TOGGLE_RECORD_MARKER';

export const addMarker = (height, width, x, y) => ({
  height,
  type: ADD_MARKER,
  width,
  x,
  y,
});

export const clearAllMarkers = () => ({
  type: CLEAR_ALL_MARKERS,
});

export const clearLastMarker = () => ({
  type: CLEAR_LAST_MARKER,
});

export const setMarkerColor = color => ({
  color,
  type: SET_MARKER_COLOR,
});

export const toggleRecordMarker = () => ({
  type: TOGGLE_RECORD_MARKER,
});
