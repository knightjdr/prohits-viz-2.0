import DimensionSelector from './dimension-selector';

const state = {
  dimensions: {
    columns: 30,
    height: 0.2,
    pageX: 20,
    pageY: 15,
    rows: 30,
    width: 0.5,
  },
};

describe('Dimension selector', () => {
  it('should return an object with dimensions', () => {
    expect(DimensionSelector(state)).toEqual(state.dimensions);
  });
});
