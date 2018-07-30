import DimensionSelector from './dimension-selector';

describe('Dimension selector', () => {
  it('should return an object with dimensions', () => {
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
    expect(DimensionSelector(state)).toEqual(state.dimensions);
  });
});
