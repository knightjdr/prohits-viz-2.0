export const SET_DIMENSIONS = 'SET_DIMENSIONS';

export const setDimensions = (rows, columns, pageX, pageY) => ({
  columns,
  pageX,
  pageY,
  rows,
  type: SET_DIMENSIONS,
});
