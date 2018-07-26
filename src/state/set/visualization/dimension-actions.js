export const SET_DIMENSIONS = 'SET_DIMENSIONS';

export const setDimensions = (rows, columns, height, pageX, pageY, width) => ({
  height,
  pageX,
  pageY,
  rows,
  columns,
  type: SET_DIMENSIONS,
  width,
});
