import { customizeDataSelector, customizeDataPropSelector } from './data-selector';

const state = {
  customize: {
    columns: ['a', 'b', 'c'],
  },
};

describe('Customize analysis selector', () => {
  it('should return an object of values', () => {
    expect(customizeDataSelector(state)).toEqual(state.customize);
  });

  it('should return a specific prop from state', () => {
    expect(customizeDataPropSelector(state, 'columns')).toBe(state.customize.columns);
  });
});
