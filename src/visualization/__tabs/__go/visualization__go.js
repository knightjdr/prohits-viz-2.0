import PropTypes from 'prop-types';
import React from 'react';

import Running from '../__running/visualization__running';
import Table from '../../../components/table/table-container';
import Warning from '../__warning/visualization__warning';

import './visualization__go.css';

const columns = [
  {
    name: 'Source',
    sortable: true,
    sortDir: null,
    sortKey: 'source',
  },
  {
    name: 'Term',
    sortable: true,
    sortDir: null,
    sortKey: 'order',
  },
  {
    name: 'ID',
    sortable: false,
  },
  {
    name: 'Term genes (T)',
    sortable: true,
    sortDir: null,
    sortKey: 't',
  },
  {
    name: 'Query genes (Q)',
    sortable: true,
    sortDir: null,
    sortKey: 'q',
  },
  {
    name: 'Q ∩ T',
    sortable: true,
    sortDir: null,
    sortKey: 'qt',
  },
  {
    name: 'p-value',
    sortable: true,
    sortDir: null,
    sortKey: 'pValue',
  },
  {
    name: 'Genes',
    sortable: false,
  },
];
const columnOrder = ['source', 'term', 'termID', 't', 'q', 'qt', 'pValue', 'genes'];

const Go = ({
  didFail,
  isRunning,
  results,
}) => {
  let content;
  if (didFail) {
    content = (
      <Warning>
        There was an error performing the GO analysis.
      </Warning>
    );
  } else if (!isRunning && results.noResults) {
    content = (
      <Warning>
        There are no enriched terms
      </Warning>
    );
  } else if (!isRunning && !results.noResults) {
    content = (
      <Table
        bottom={10}
        columns={columns}
        columnOrder={columnOrder}
        rows={results.terms}
      />
    );
  } else {
    content = <Running />;
  }
  return (
    <div className="visualization__go">
      { content }
    </div>
  );
};

Go.propTypes = {
  didFail: PropTypes.bool.isRequired,
  isRunning: PropTypes.bool.isRequired,
  results: PropTypes.shape({
    noResults: PropTypes.bool,
    terms: PropTypes.arrayOf(
      PropTypes.shape,
    ),
    warnings: PropTypes.arrayOf(
      PropTypes.string,
    ),
  }).isRequired,
};

export default Go;
