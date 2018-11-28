const addColor = (data, gradient, range) => (
  data.map(datum => ({
    ...datum,
    color: gradient[range(datum.abundance)],
  }))
);

export default addColor;
