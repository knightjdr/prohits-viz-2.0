import { DisplaySelector, DisplayPropSelector } from './display-selector';

const state = {
  display: {
    floatMapRight: 100,
    floatMapTop: 200,
  },
};

describe('Display selector', () => {
  it('should return an object of display values', () => {
    expect(DisplaySelector(state)).toEqual(state.display);
  });

  it('should return a specific prop from display state', () => {
    expect(DisplayPropSelector(state, 'floatMapRight')).toBe(100);
  });
});
