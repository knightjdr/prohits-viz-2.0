import DimensionSelector from './dimension-selector';

const state = {
  dimensions: {
    color: '#ff0000',
    list: [
      {
        text: 'annotation1',
        x: 0,
        y: 20,
      },
      {
        text: 'annotation2',
        x: 40,
        y: 60,
      },
    ],
  },
};

describe('Dimension selector', () => {
  it('should return an object with dimensions', () => {
    expect(DimensionSelector(state)).toEqual(state.dimensions);
  });
});
