import positionCustomizeSelector from './position-selector';

describe('Customize position selector', () => {
  it('should return curent viewport center position', () => {
    const state = {
      positionCustomize: {
        x: 0.5,
        y: 0.3,
      },
    };
    expect(positionCustomizeSelector(state)).toEqual(state.positionCustomize);
  });
});
