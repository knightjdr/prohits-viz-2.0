import { customizeSelector, customizePropSelector } from './customize-selector';

const state = {
  customize: {
    columns: ['a', 'b', 'c'],
  },
};

describe('Customize analysis selector', () => {
  it('should return an object of values', () => {
    expect(customizeSelector(state)).toEqual(state.customize);
  });

  it('should return a specific prop from state', () => {
    expect(customizePropSelector(state, 'columns')).toBe(state.customize.columns);
  });
});
