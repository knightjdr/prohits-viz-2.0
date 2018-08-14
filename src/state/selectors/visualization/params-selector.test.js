import { ParametersSelector, ParametersSelectorProp } from './params-selector';

const state = {
  parameters: {
    someParam: 'test',
    someParam2: 'test2',
  },
};

describe('Parameters selector', () => {
  it('should return all analysis parameters', () => {
    expect(ParametersSelector(state)).toEqual(state.parameters);
  });

  it('should return a specific prop from params state', () => {
    expect(ParametersSelectorProp(state, 'someParam')).toBe('test');
  });
});
