import SortSelector from './sort-selector';

describe('Sort selector', () => {
  it('should return an object with sort information', () => {
    const state = {
      rows: {
        direction: 'asc',
        id: 1,
        sortBy: 2,
      },
    };
    expect(SortSelector(state)).toEqual(state.rows);
  });
});
