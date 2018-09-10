export const CLEAR_GO_ANNOTATION = 'CLEAR_GO_ANNOTATION';
export const SET_GO_ANNOTATION = 'SET_GO_ANNOTATION';

export const clearGoAnnotation = () => ({
  type: CLEAR_GO_ANNOTATION,
});

export const setGoAnnotation = text => ({
  text,
  type: SET_GO_ANNOTATION,
});
