import formatRows from './format-rows';

jest.mock('./format-genes');
jest.mock('./format-term');
jest.mock('./go-link');

const results = {
  noResults: false,
  terms: [
    {
      depth: 1,
      genes: ['x', 'y', 'z'],
      q: 5,
      qt: 2,
      pValue: 0.01,
      source: 'BP',
      t: 10,
      term: 'term1',
    },
    {
      depth: 2,
      genes: ['xx', 'yy', 'zz'],
      q: 10,
      qt: 4,
      pValue: 0.05,
      source: 'CC',
      t: 25,
      term: 'term2',
    },
  ],
  warnings: ['warning'],
};
const expected = {
  noResults: false,
  terms: [
    {
      genes: { content: 'genes' },
      q: { content: results.terms[0].q },
      qt: { content: results.terms[0].qt },
      pValue: { content: results.terms[0].pValue },
      source: { content: results.terms[0].source },
      t: { content: results.terms[0].t },
      term: {
        content: 'content',
      },
      termID: {
        className: 'table__cell-clipped',
        content: 'link',
      },
    },
    {
      genes: { content: 'genes' },
      q: { content: results.terms[1].q },
      qt: { content: results.terms[1].qt },
      pValue: { content: results.terms[1].pValue },
      source: { content: results.terms[1].source },
      t: { content: results.terms[1].t },
      term: {
        content: 'content',
      },
      termID: {
        className: 'table__cell-clipped',
        content: 'link',
      },
    },
  ],
  warnings: ['warning'],
};

describe('Format rows', () => {
  it('should reformat results', () => {
    expect(formatRows(results)).toEqual(expected);
  });
});
