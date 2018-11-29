const valuesToColor = (data, gradient, range) => (
  data.map(datum => gradient[range(datum)])
);

export default valuesToColor;
