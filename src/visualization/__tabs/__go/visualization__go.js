import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { faFileExport } from '@fortawesome/pro-solid-svg-icons';

import Annotation from '../__annotation/visualization__annotation';
import Button from '../../../components/button/button';
import Running from '../__running/visualization__running';
import Table from '../../../components/table/table-container';
import Warning from '../__warning/visualization__warning';

import './visualization__go.css';

const columns = [
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
    name: 'Source',
    sortable: true,
    sortDir: null,
    sortKey: 'source',
  },
  {
    name: 'T',
    sortable: true,
    sortDir: null,
    sortKey: 't',
  },
  {
    name: 'Q',
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
const columnOrder = ['termID', 'source', 't', 'q', 'qt', 'pValue', 'genes'];

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
      <Fragment>
        <Table
          bottom={50}
          columns={columns}
          columnOrder={columnOrder}
          columnTemplate="minmax(82px, 15%) minmax(73px, 10%) minmax(60px, 10%) minmax(60px, 10%) minmax(63px, 10%) minmax(76px, 15%) minmax(186px, 1fr)"
          firstColumn={{
            minWidth: 200,
            name: 'term',
            width: '20%',
          }}
          rows={results.terms}
        />
        <div className="visualization__go-annotation">
          <Annotation />
          <Button
            className="visualization__go-annotation-button"
            handleClick={() => {}}
            type="success"
          >
            <FontAwesomeIcon icon={faFileExport} />
            <span>Export</span>
          </Button>
        </div>
      </Fragment>
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
