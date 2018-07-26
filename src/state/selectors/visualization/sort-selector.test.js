import SortSelector from './sort-selector';

const state = {
  rows: {
    direction: 'asc',
    id: 1,
    sortBy: 2,
  },
};

describe('Sort selector', () => {
  it('should return an object with sort information', () => {
    expect(SortSelector(state)).toEqual(state.rows);
  });
});
