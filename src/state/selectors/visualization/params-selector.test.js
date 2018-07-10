import ParamsSelector from './params-selector';

const state = {
  parameters: {
    someParam: 'test',
    someParam2: 'test2',
  },
};

describe('Parameters selector', () => {
  it('should return all analysis parameters', () => {
    expect(ParamsSelector(state)).toEqual(state.parameters);
  });
});
