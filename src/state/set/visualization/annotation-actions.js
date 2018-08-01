import DeepCopy from '../../../helpers/deep-copy';

export const ADD_ANNOTATION = 'ADD_ANNOTATION';
export const CLEAR_ALL_ANNOTATIONS = 'CLEAR_ALL_ANNOTATIONS';
export const CLEAR_LAST_ANNOTATION = 'CLEAR_LAST_ANNOTATION';
export const SET_ANNOTATION_COLOR = 'SET_ANNOTATION_COLOR';
export const SET_ANNOTATION_SIZE = 'SET_ANNOTATION_SIZE';
export const TOGGLE_ANNOTATIONS = 'TOGGLE_ANNOTATIONS';
export const UPDATE_ANNOTATION = 'UPDATE_ANNOTATION';

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

export const setAnnotationSize = fontSize => ({
  fontSize,
  type: SET_ANNOTATION_SIZE,
});

export const toggleAnnotations = () => ({
  type: TOGGLE_ANNOTATIONS,
});

export const updateAnnotation = list => ({
  list,
  type: UPDATE_ANNOTATION,
});

export const updateList = (index, x, y) => (
  (dispatch, getState) => {
    const newList = DeepCopy(getState().annotations.list);
    newList[index] = {
      text: newList[index].text,
      x,
      y,
    };
    dispatch(updateAnnotation(newList));
  }
);
