import { displaySelector, displayPropSelector } from './display-selector';

const state = {
  display: {
    floatMapRight: 100,
    floatMapTop: 200,
  },
};

describe('Display selector', () => {
  it('should return an object of display values', () => {
    expect(displaySelector(state)).toEqual(state.display);
  });

  it('should return a specific prop from display state', () => {
    expect(displayPropSelector(state, 'floatMapRight')).toBe(100);
  });
});
