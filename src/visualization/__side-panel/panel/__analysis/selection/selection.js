import PropTypes from 'prop-types';
import React from 'react';

import Context from './context-menu/context-menu';
import GeneSelection from './selection__gene';
import PasteModal from './paste-modal/paste-modal';

import './selection.css';

const Selection = ({
  arrangeSelected,
  canPasteContext,
  closeContextMenu,
  columnRef,
  columns,
  columnsSelected,
  contextEvent,
  copyAll,
  copySelected,
  listSelect,
  listSwap,
  openContextMenu,
  paste,
  pasteText,
  rowRef,
  rows,
  rowsSelected,
  showContext,
  showModal,
  toggleModal,
  updatePasteList,
}) => (
  <div>
    <Context
      canPaste={canPasteContext}
      closeMenu={closeContextMenu}
      copyAll={copyAll}
      copySelected={copySelected}
      event={contextEvent}
      show={showContext}
      toggleModal={toggleModal}
    />
    <div className="panel__title">
      Gene selection
    </div>
    <GeneSelection
      arrangeSelected={arrangeSelected}
      columnRef={columnRef}
      columns={columns}
      columnsSelected={columnsSelected}
      listSelect={listSelect}
      listSwap={listSwap}
      openContextMenu={openContextMenu}
      rowRef={rowRef}
      rows={rows}
      rowsSelected={rowsSelected}
    />
    <PasteModal
      cancel={toggleModal}
      paste={paste}
      pasteText={pasteText}
      visible={showModal}
      updatePasteList={updatePasteList}
    />
  </div>
);

Selection.defaultProps = {
  contextEvent: null,
};

Selection.propTypes = {
  arrangeSelected: PropTypes.func.isRequired,
  canPasteContext: PropTypes.bool.isRequired,
  closeContextMenu: PropTypes.func.isRequired,
  columnRef: PropTypes.shape({}).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  columnsSelected: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  contextEvent: PropTypes.shape({}),
  copyAll: PropTypes.func.isRequired,
  copySelected: PropTypes.func.isRequired,
  listSelect: PropTypes.func.isRequired,
  listSwap: PropTypes.func.isRequired,
  openContextMenu: PropTypes.func.isRequired,
  paste: PropTypes.func.isRequired,
  pasteText: PropTypes.string.isRequired,
  rowRef: PropTypes.shape({}).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  rowsSelected: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  showContext: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  updatePasteList: PropTypes.func.isRequired,
};

export default Selection;
