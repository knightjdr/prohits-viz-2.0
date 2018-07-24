import ColumnsSelector from './columns-selector';

const state = {
  columns: {
    names: ['a', 'b', 'c'],
    ref: 'a',
  },
};

describe('columns selector', () => {
  it('should return an object with column information', () => {
    expect(ColumnsSelector(state)).toEqual(state.columns);
  });
});
