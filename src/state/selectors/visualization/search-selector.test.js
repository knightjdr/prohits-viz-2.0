import searchSelector from './search-selector';

describe('Search selector', () => {
  it('should return an object with the search term', () => {
    const state = {
      search: {
        term: '',
      },
    };
    expect(searchSelector(state)).toEqual(state.search);
  });
});
