import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { faFileExport } from '@fortawesome/pro-solid-svg-icons';

import Annotation from '../annotation/annotation-container';
import Button from '../../../components/button/button';
import Columns from './columns';
import Running from '../running/running';
import Table from '../../../components/table/table-container';
import Warning from '../warning/warning';

import './go.css';

const columnDims = 'minmax(82px, 15%) minmax(73px, 10%) minmax(60px, 10%) minmax(60px, 10%) minmax(63px, 10%) minmax(76px, 15%) minmax(186px, 1fr)';

const Go = ({
  didFail,
  handleExport,
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
          bottom={65}
          columns={Columns.header}
          columnOrder={Columns.order.slice(1)}
          columnTemplate={columnDims}
          firstColumn={{
            minWidth: 175,
            name: 'term',
            width: 175,
          }}
          maxBodyWidth={600}
          rows={results.terms}
        />
        <div className="visualization__go-annotation">
          <Annotation />
          <Button
            className="visualization__go-annotation-button"
            onClick={handleExport}
            theme="success"
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
  handleExport: PropTypes.func.isRequired,
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
