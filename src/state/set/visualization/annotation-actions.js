export const ADD_ANNOTATION = 'ADD_ANNOTATION';
export const CLEAR_ALL_ANNOTATIONS = 'CLEAR_ALL_ANNOTATIONS';
export const CLEAR_LAST_ANNOTATION = 'CLEAR_LAST_ANNOTATION';
export const SET_ANNOTATION_COLOR = 'SET_ANNOTATION_COLOR';
export const TOGGLE_MOVE_ANNOTATION = 'TOGGLE_MOVE_ANNOTATION';

export const addAnnotation = (text, x, y) => ({
  text,
  type: ADD_ANNOTATION,
  x,
  y,
});

export const clearAllAnnotations = () => ({
  type: CLEAR_ALL_ANNOTATIONS,
});

export const clearLastAnnotation = () => ({
  type: CLEAR_LAST_ANNOTATION,
});

export const setAnnotationColor = color => ({
  color,
  type: SET_ANNOTATION_COLOR,
});

export const toggleMoveAnnotation = () => ({
  type: TOGGLE_MOVE_ANNOTATION,
});
