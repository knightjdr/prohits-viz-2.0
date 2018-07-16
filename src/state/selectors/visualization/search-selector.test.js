import SearchSelector from './search-selector';

const state = {
  search: {
    term: '',
  },
};

describe('Search selector', () => {
  it('should return an object with the search term', () => {
    expect(SearchSelector(state)).toEqual(state.search);
  });
});
