import RowNameSelector from './row-name-selector';

const state = {
  rows: {
    direction: null,
    list: [
      { data: {}, name: 'a' },
      { data: {}, name: 'b' },
      { data: {}, name: 'c' },
    ],
    sortBy: null,
  },
};

describe('row name selector', () => {
  it('should return an array of row names', () => {
    expect(RowNameSelector(state)).toEqual(['a', 'b', 'c']);
  });
});
