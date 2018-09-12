import { parameterSelector, parameterSelectorProp } from './params-selector';

const state = {
  parameters: {
    someParam: 'test',
    someParam2: 'test2',
  },
};

describe('Parameters selector', () => {
  it('should return all analysis parameters', () => {
    expect(parameterSelector(state)).toEqual(state.parameters);
  });

  it('should return a specific prop from params state', () => {
    expect(parameterSelectorProp(state, 'someParam')).toBe('test');
  });
});
