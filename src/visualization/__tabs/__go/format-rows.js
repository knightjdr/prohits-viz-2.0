import formatTerm from './format-term';
import genes from './format-genes';
import link from './go_link';

const FormatRows = results => ({
  noResults: results.noResults,
  terms: results.terms.map((term) => {
    const termFormat = formatTerm(term.depth, term.term);
    return ({
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
        content: termFormat.content,
        style: termFormat.style,
      },
      termID: {
        className: 'table__cell-clipped',
        content: link(term.termID, term.source),
      },
    });
  }),
  warnings: results.warning,
});

export default FormatRows;
