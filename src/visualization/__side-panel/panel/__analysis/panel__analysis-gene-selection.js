import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faArrowUp } from '@fortawesome/pro-solid-svg-icons';

import Select from './panel__analysis-select';

import './panel__analysis';

const GeneSelection = ({
  columns,
  openContextMenu,
  rows,
  selectedColumns,
  selectedRows,
}) => (
  <div className="panel__analysis-selection">
    <div className="panel__analysis-selection-grid">
      <div className="panel__analysis-selection-header">
        Columns
      </div>
      <div />
      <div className="panel__analysis-selection-header">
        Selected
      </div>
      <div />
      <Select
        openContextMenu={openContextMenu}
        options={columns}
      />
      <div className="panel__analysis-selection-button-group">
        <button
          className="panel__analysis-select-arrow"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={90} />
        </button>
        <button
          className="panel__analysis-select-arrow"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={270} />
        </button>
      </div>
      <Select
        canPaste
        openContextMenu={openContextMenu}
        options={selectedColumns}
      />
      <div className="panel__analysis-selection-button-group">
        <button
          className="panel__analysis-select-arrow"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          className="panel__analysis-select-arrow"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={180} />
        </button>
      </div>
    </div>
    <div className="panel__analysis-selection-grid">
      <div className="panel__analysis-selection-header">
        Rows
      </div>
      <div />
      <div className="panel__analysis-selection-header">
        Selected
      </div>
      <div />
      <Select
        openContextMenu={openContextMenu}
        options={rows}
      />
      <div className="panel__analysis-selection-button-group">
        <button
          className="panel__analysis-select-arrow"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={90} />
        </button>
        <button
          className="panel__analysis-select-arrow"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={270} />
        </button>
      </div>
      <Select
        canPaste
        openContextMenu={openContextMenu}
        options={selectedRows}
      />
      <div className="panel__analysis-selection-button-group">
        <button
          className="panel__analysis-select-arrow"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          className="panel__analysis-select-arrow"
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={180} />
        </button>
      </div>
    </div>
  </div>
);

GeneSelection.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  openContextMenu: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  selectedColumns: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  selectedRows: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default GeneSelection;
