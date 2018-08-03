import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faArrowUp } from '@fortawesome/pro-solid-svg-icons';

import Select from './selection__select';

import './selection.css';

const GeneSelection = ({
  arrangeSelected,
  columnRef,
  columns,
  columnsSelected,
  openContextMenu,
  listSelect,
  listSwap,
  rowRef,
  rows,
  rowsSelected,
}) => (
  <div className="selection">
    <div className="selection__grid">
      <div className="selection__header">
        Columns
      </div>
      <div />
      <div className="selection__header">
        Selected
      </div>
      <div />
      <Select
        listSelect={listSelect}
        openContextMenu={openContextMenu}
        options={columns}
        setRef={columnRef}
        target="columns"
      />
      <div className="selection__button-group">
        <button
          className="selection__select-arrow"
          onClick={() => { listSwap('columns', 'columnsSelected'); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={90} />
        </button>
        <button
          className="selection__select-arrow"
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
      <div className="selection__button-group">
        <button
          className="selection__select-arrow"
          onClick={() => { arrangeSelected('columnsSelected', -1); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          className="selection__select-arrow"
          onClick={() => { arrangeSelected('columnsSelected', 1); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={180} />
        </button>
      </div>
    </div>
    <div className="selection__grid">
      <div className="selection__header">
        Rows
      </div>
      <div />
      <div className="selection__header">
        Selected
      </div>
      <div />
      <Select
        listSelect={listSelect}
        openContextMenu={openContextMenu}
        options={rows}
        setRef={rowRef}
        target="rows"
      />
      <div className="selection__button-group">
        <button
          className="selection__select-arrow"
          onClick={() => { listSwap('rows', 'rowsSelected'); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} rotation={90} />
        </button>
        <button
          className="selection__select-arrow"
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
      <div className="selection__button-group">
        <button
          className="selection__select-arrow"
          onClick={() => { arrangeSelected('rowsSelected', -1); }}
          type="button"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          className="selection__select-arrow"
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
  columnRef: PropTypes.shape({}).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  columnsSelected: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  listSelect: PropTypes.func.isRequired,
  listSwap: PropTypes.func.isRequired,
  openContextMenu: PropTypes.func.isRequired,
  rowRef: PropTypes.shape({}).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  rowsSelected: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default GeneSelection;
