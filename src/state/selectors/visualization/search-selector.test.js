import searchSelector from './search-selector';

const state = {
  search: {
    columns: ['a', 'b'],
    columnsCustomize: ['a'],
    match: true,
    matchCustomize: false,
    rows: ['x', 'y'],
    rowsCustomize: ['x'],
    term: '',
  },
};


describe('Search selector', () => {
  it('should return main info with no type selected', () => {
    const expected = {
      columns: ['a', 'b'],
      match: true,
      rows: ['x', 'y'],
      term: '',
    };
    expect(searchSelector(state)).toEqual(expected);
  });

  it('should return customize info with "customize" type selected', () => {
    const expected = {
      columns: ['a'],
      match: false,
      rows: ['x'],
      term: '',
    };
    expect(searchSelector(state, 'customize')).toEqual(expected);
  });

  it('should return all info with "all" type selected', () => {
    expect(searchSelector(state, 'all')).toEqual(state.search);
  });
});
