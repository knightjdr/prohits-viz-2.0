export const SET_DIMENSIONS = 'SET_DIMENSIONS';

export const setDimensions = (rows, columns, pageX, pageY) => ({
  pageX,
  pageY,
  rows,
  columns,
  type: SET_DIMENSIONS,
});
