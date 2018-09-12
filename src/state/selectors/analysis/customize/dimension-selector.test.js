import dimensionCustomizeSelector from './dimension-selector';

describe('Customize dimension selector', () => {
  it('should return an object with dimensions', () => {
    const state = {
      dimensionsCustomize: {
        columns: 30,
        height: 0.2,
        pageX: 20,
        pageY: 15,
        rows: 30,
        width: 0.5,
      },
    };
    expect(dimensionCustomizeSelector(state)).toEqual(state.dimensionsCustomize);
  });
});
