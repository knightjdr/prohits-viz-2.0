import HeaderSelector from './header-selector';

const state = {
  header: ['a', 'b'],
};

describe('Header selector', () => {
  it('should return header as an array', () => {
    expect(HeaderSelector(state)).toEqual(state.header);
  });
});
