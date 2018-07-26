/* Return a function that will map an number to an output integer range.
** Checks to make sure the input number is within the input range. */

const SetRange = (inMin, inMax, outMin, outMax) => {
  const inputRange = inMax - inMin;
  const outputRange = outMax - outMin;
  return (inputNum) => {
    let num = inputNum;
    if (inputNum > inMax) {
      num = inMax;
    } else if (inputNum < inMin) {
      num = inMin;
    }
    return Math.round((((num - inMin) * outputRange) / inputRange) + outMin);
  };
};

export default SetRange;
