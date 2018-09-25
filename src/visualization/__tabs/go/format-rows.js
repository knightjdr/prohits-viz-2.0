import formatTerm from './format-term';
import genes from './format-genes';
import link from './go-link';

const FormatRows = results => ({
  noResults: results.noResults,
  terms: results.terms.map(term => ({
    genes: {
      content: genes(term.genes),
    },
    q: {
      content: term.q,
    },
    qt: {
      content: term.qt,
    },
    pValue: {
      content: term.pValue,
    },
    source: {
      content: term.source,
    },
    t: {
      content: term.t,
    },
    term: {
      content: formatTerm(term.depth, term.term),
    },
    termID: {
      className: 'table__cell-clipped',
      content: link(term.termID, term.source),
    },
  })),
  warnings: results.warnings,
});

export default FormatRows;
