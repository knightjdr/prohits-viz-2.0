const setRange = jest.fn().mockImplementation(
  () => (inputNum) => {
    let num = inputNum;
    if (inputNum > 50) {
      num = 50;
    } else if (inputNum < 0) {
      num = 0;
    }
    return Math.round(num);
  },
);

export default setRange;
