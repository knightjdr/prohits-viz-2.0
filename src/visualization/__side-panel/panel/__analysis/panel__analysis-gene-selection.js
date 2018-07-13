import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faArrowUp } from '@fortawesome/pro-solid-svg-icons';

import Select from './panel__analysis-select';

import './panel__analysis';

const GeneSelection = ({
  arrangeSelected,
  columns,
  columnsSelected,
  openContextMenu,
  listSelect,
  listSwap,
  rows,
  rowsSelected,
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
        listSelect={listSelect}
        openContextMenu={openContextMenu}
        options={columns}
        target="columns"
      />
      <div className="panel__analysis-selection-button-group">
        <button
          className="panel__analysis-select-arrow"
          onClick={() => { listSwap('columns', 'columnsSelected', 'columnMap'); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={90} />
        </button>
        <button
          className="panel__analysis-select-arrow"
          onClick={() => { listSwap('columnsSelected', 'columns', 'columnMap'); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={270} />
        </button>
      </div>
      <Select
        canPaste
        listSelect={listSelect}
        openContextMenu={openContextMenu}
        options={columnsSelected}
        target="columnsSelected"
      />
      <div className="panel__analysis-selection-button-group">
        <button
          className="panel__analysis-select-arrow"
          onClick={() => { arrangeSelected('columnsSelected', -1); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          className="panel__analysis-select-arrow"
          onClick={() => { arrangeSelected('columnsSelected', 1); }}
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
        listSelect={listSelect}
        openContextMenu={openContextMenu}
        options={rows}
        target="rows"
      />
      <div className="panel__analysis-selection-button-group">
        <button
          className="panel__analysis-select-arrow"
          onClick={() => { listSwap('rows', 'rowsSelected', 'rowMap'); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={90} />
        </button>
        <button
          className="panel__analysis-select-arrow"
          onClick={() => { listSwap('rowsSelected', 'rows', 'rowMap'); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={270} />
        </button>
      </div>
      <Select
        canPaste
        listSelect={listSelect}
        openContextMenu={openContextMenu}
        options={rowsSelected}
        target="rowsSelected"
      />
      <div className="panel__analysis-selection-button-group">
        <button
          className="panel__analysis-select-arrow"
          onClick={() => { arrangeSelected('rowsSelected', -1); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          className="panel__analysis-select-arrow"
          onClick={() => { arrangeSelected('rowsSelected', 1); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={180} />
        </button>
      </div>
    </div>
  </div>
);

GeneSelection.propTypes = {
  arrangeSelected: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  columnsSelected: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  listSelect: PropTypes.func.isRequired,
  listSwap: PropTypes.func.isRequired,
  openContextMenu: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  rowsSelected: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default GeneSelection;
