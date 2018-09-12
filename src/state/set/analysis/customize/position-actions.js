export const UPDATE_CUSTOMIZE_POSITION = 'UPDATE_CUSTOMIZE_POSITION';

export const updatePosition = (x, y) => ({
  type: UPDATE_CUSTOMIZE_POSITION,
  x,
  y,
});
