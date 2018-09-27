const setEdgeRange = jest.fn().mockImplementation(
  () => (inputNum) => {
    if (inputNum <= 1) {
      return 0;
    } else if (
      inputNum > 1 &&
      inputNum <= 5
    ) {
      return 1;
    }
    return 3;
  },
);

export default setEdgeRange;
