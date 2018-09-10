import goSelector from './go-selector';

const state = {
  go: {
    annotation: 'text',
  },
};

describe('GO analysis table selector', () => {
  it('should return an object with the table state', () => {
    expect(goSelector(state)).toEqual(state.go);
  });
});
