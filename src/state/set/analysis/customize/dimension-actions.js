export const SET_CUSTOMIZE_DIMENSIONS = 'SET_CUSTOMIZE_DIMENSIONS';

export const setDimensions = (rows, columns, pageX, pageY, height, width) => ({
  columns,
  height,
  pageX,
  pageY,
  rows,
  type: SET_CUSTOMIZE_DIMENSIONS,
  width,
});
