import HomeLoaded from './home-loaded-selector';

const state = {
  home: {
    isLoaded: true,
  },
};
const expectedState = true;

describe('Home loaded state', () => {
  it('should return array of articles', () => {
    expect(HomeLoaded(state)).toEqual(expectedState);
  });
});
