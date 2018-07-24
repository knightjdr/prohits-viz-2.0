import RowsSelector from './rows-selector';

const state = {
  rows: {
    list: [
      { data: {}, name: 'a' },
      { data: {}, name: 'b' },
      { data: {}, name: 'c' },
    ],
    order: ['a', 'b', 'c'],
  },
};

describe('rows selector', () => {
  it('should return an object with row information', () => {
    expect(RowsSelector(state)).toEqual(state.rows);
  });
});
