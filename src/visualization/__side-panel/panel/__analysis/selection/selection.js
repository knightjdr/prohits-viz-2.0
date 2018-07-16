import PropTypes from 'prop-types';
import React from 'react';

import ContextMenu from './context-menu/context-menu';
import GeneSelection from './selection__gene';
import PasteModal from './paste-modal/paste-modal';

import './selection.css';

const Selection = ({
  arrangeSelected,
  canPasteContext,
  closeContextMenu,
  columns,
  columnsSelected,
  contextPos,
  copyAll,
  copySelected,
  listSelect,
  listSwap,
  openContextMenu,
  paste,
  pasteText,
  rows,
  rowsSelected,
  showContext,
  showModal,
  toggleModal,
  updatePasteList,
}) => (
  <div>
    <ContextMenu
      canPaste={canPasteContext}
      closeMenu={closeContextMenu}
      copyAll={copyAll}
      copySelected={copySelected}
      left={contextPos.left}
      show={showContext}
      top={contextPos.top}
      toggleModal={toggleModal}
    />
    <div className="panel__title">
      Gene selection
    </div>
    <GeneSelection
      arrangeSelected={arrangeSelected}
      columns={columns}
      columnsSelected={columnsSelected}
      listSelect={listSelect}
      listSwap={listSwap}
      openContextMenu={openContextMenu}
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

Selection.propTypes = {
  arrangeSelected: PropTypes.func.isRequired,
  canPasteContext: PropTypes.bool.isRequired,
  closeContextMenu: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  columnsSelected: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  contextPos: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }).isRequired,
  copyAll: PropTypes.func.isRequired,
  copySelected: PropTypes.func.isRequired,
  listSelect: PropTypes.func.isRequired,
  listSwap: PropTypes.func.isRequired,
  openContextMenu: PropTypes.func.isRequired,
  paste: PropTypes.func.isRequired,
  pasteText: PropTypes.string.isRequired,
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
