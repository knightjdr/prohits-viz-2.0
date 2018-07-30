import SearchSelector from './search-selector';

describe('Search selector', () => {
  it('should return an object with the search term', () => {
    const state = {
      search: {
        term: '',
      },
    };
    expect(SearchSelector(state)).toEqual(state.search);
  });
});
