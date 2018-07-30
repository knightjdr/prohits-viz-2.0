import HeaderSelector from './header-selector';

describe('Header selector', () => {
  it('should return header as an array', () => {
    const currentState = {
      header: ['a', 'b'],
    };
    const expectedValue = ['a', 'b'];
    expect(HeaderSelector(currentState)).toEqual(expectedValue);
  });
});
