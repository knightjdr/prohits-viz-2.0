import ColumnsSelector from './columns-selector';

describe('Columns selector', () => {
  it('should return an object with column information', () => {
    const state = {
      columns: {
        names: ['a', 'b', 'c'],
        ref: 'a',
      },
    };
    expect(ColumnsSelector(state)).toEqual(state.columns);
  });
});
