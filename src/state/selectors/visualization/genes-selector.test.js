import GeneSelector from './genes-selector';

const state = {
  genes: {
    columnMap: {},
    columns: [],
    columnsSelected: [],
    rowMap: {},
    rows: [],
    rowsSelected: [],
  },
};

describe('Gene selection selector', () => {
  it('should return an object with the genes used in analysis selection', () => {
    expect(GeneSelector(state)).toEqual(state.genes);
  });
});
