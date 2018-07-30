/* Return a function that will map a range of numbers to one of three integers.
** Checks to make sure the input number is within the input range. */

const SetEdgeRange = (primaryFilter, secondaryFilter, scoreType, outMin, outMax) => {
  const outputRange = outMax - outMin;
  const first = outMax;
  const second = Math.round((outputRange / 2) + outMin);
  const third = Math.round((outputRange / 4) + outMin);
  if (scoreType === 'gte') {
    return (inputNum) => {
      if (inputNum >= primaryFilter) {
        return first;
      } else if (
        inputNum < primaryFilter &&
        inputNum >= secondaryFilter
      ) {
        return second;
      }
      return third;
    };
  }
  return (inputNum) => {
    if (inputNum <= primaryFilter) {
      return first;
    } else if (
      inputNum > primaryFilter &&
      inputNum <= secondaryFilter
    ) {
      return second;
    }
    return third;
  };
};

export default SetEdgeRange;