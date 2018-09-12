import { displayCustomizeSelector, displayCustomizePropSelector } from './display-selector';

const state = {
  displayCustomize: {
    floatMapRight: 100,
    floatMapTop: 200,
  },
};

describe('Customize display selector', () => {
  it('should return an object of display values', () => {
    expect(displayCustomizeSelector(state)).toEqual(state.displayCustomize);
  });

  it('should return a specific prop from display state', () => {
    expect(displayCustomizePropSelector(state, 'floatMapRight')).toBe(100);
  });
});
