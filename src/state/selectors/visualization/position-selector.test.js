import PositionSelector from './position-selector';

describe('PositionSelector selector', () => {
  it('should return curent viewport center position', () => {
    const state = {
      position: {
        x: 0.5,
        y: 0.3,
      },
    };
    expect(PositionSelector(state)).toEqual(state.position);
  });
});
