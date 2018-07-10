import PositionSelector from './position-selector';

const state = {
  position: {
    x: 0.5,
    y: 0.3,
  },
};

describe('PositionSelector selector', () => {
  it('should return curent viewport center position', () => {
    expect(PositionSelector(state)).toEqual(state.position);
  });
});
