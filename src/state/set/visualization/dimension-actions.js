export const SET_DIMENSIONS = 'SET_DIMENSIONS';

export const setDimensions = (height, pageX, pageY, width) => ({
  height,
  pageX,
  pageY,
  type: SET_DIMENSIONS,
  width,
});
