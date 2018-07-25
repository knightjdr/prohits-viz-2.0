import RowsSelector from './rows-selector';

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

describe('rows selector', () => {
  it('should return a list with row data', () => {
    expect(RowsSelector(state)).toEqual(state.rows.list);
  });
});
