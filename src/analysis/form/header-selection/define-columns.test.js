import DefineColumns, { recommendedHeaders } from './define-columns';
import FilterHeader from './filter-header';

jest.mock('./filter-header');
FilterHeader.mockReturnValue('test');

const header = ['column1', 'column2', 'column3', 'column4'];
const expected = {
  abundance: 'test',
  condition: 'test',
  readout: 'test',
  score: 'test',
};

describe('DefineColumns', () => {
  test('Calls FilterHeader with the correct recommended array', () => {
    const columns = DefineColumns('dotplot', 'saint', header);
    expect(columns).toEqual(expected);
    expect(FilterHeader).toHaveBeenCalledTimes(4);
    expect(FilterHeader).toHaveBeenCalledWith(recommendedHeaders.dotplot.saint.abundance, header);
    expect(FilterHeader).toHaveBeenCalledWith(recommendedHeaders.dotplot.saint.condition, header);
    expect(FilterHeader).toHaveBeenCalledWith(recommendedHeaders.dotplot.saint.readout, header);
    expect(FilterHeader).toHaveBeenCalledWith(recommendedHeaders.dotplot.saint.score, header);
  });
});
