import PropTypes from 'prop-types';
import React from 'react';

import AnalysisOptions from './analysis-options/analysis-options-container';
import ContextMenu from './context-menu/context-menu';
import GeneSelection from './panel__analysis-gene-selection';

import './panel__analysis.css';

const Analysis = ({
  canPasteContext,
  closeContextMenu,
  columns,
  contextPos,
  openContextMenu,
  rows,
  selectedColumns,
  selectedRows,
  showContext,
}) => (
  <div className="panel">
    <ContextMenu
      canPaste={canPasteContext}
      closeMenu={closeContextMenu}
      left={contextPos.left}
      show={showContext}
      top={contextPos.top}
    />
    <div className="panel__title">
      Gene selection
    </div>
    <GeneSelection
      columns={columns}
      openContextMenu={openContextMenu}
      rows={rows}
      selectedColumns={selectedColumns}
      selectedRows={selectedRows}
    />
    <div className="panel__border" />
    <div className="panel__title">
      Analysis
    </div>
    <AnalysisOptions />
  </div>
);

Analysis.propTypes = {
  canPasteContext: PropTypes.bool.isRequired,
  closeContextMenu: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  contextPos: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }).isRequired,
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
  showContext: PropTypes.bool.isRequired,
};

export default Analysis;
