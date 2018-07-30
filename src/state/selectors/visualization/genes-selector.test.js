import GeneSelector from './genes-selector';

describe('Gene selection selector', () => {
  it('should return an object with the genes used in analysis selection', () => {
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
    expect(GeneSelector(state)).toEqual(state.genes);
  });
});
