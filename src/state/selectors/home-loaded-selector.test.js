import HomeLoaded from './home-loaded-selector';

describe('Home loaded state', () => {
  it('should return array of articles', () => {
    const currentState = {
      home: {
        isLoaded: true,
      },
    };
    const expectedValue = true;
    expect(HomeLoaded(currentState)).toEqual(expectedValue);
  });
});
