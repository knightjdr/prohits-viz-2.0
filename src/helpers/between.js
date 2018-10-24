/* Ensure a value is between a min and a max, otherwise returns
** the min or max value. */
const between = (value, min, max) => {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
};

export default between;
