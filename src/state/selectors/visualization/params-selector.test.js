import ParamsSelector from './params-selector';

describe('Parameters selector', () => {
  it('should return all analysis parameters', () => {
    const state = {
      parameters: {
        someParam: 'test',
        someParam2: 'test2',
      },
    };
    expect(ParamsSelector(state)).toEqual(state.parameters);
  });
});
