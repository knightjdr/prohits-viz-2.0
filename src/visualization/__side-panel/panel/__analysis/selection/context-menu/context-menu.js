import PropTypes from 'prop-types';
import React from 'react';

import ClickOutside from '../../../../../../components/click-outside/click-outside';

import './context-menu.css';

const ContextMenu = ({
  canPaste,
  closeMenu,
  copyAll,
  copySelected,
  left,
  show,
  toggleModal,
  top,
}) => (
  <ClickOutside callback={closeMenu}>
    <div
      className="context-menu"
      style={{
        left,
        opacity: show ? 1 : 0,
        top,
        visibility: show ? 'visible' : 'hidden',
      }}
    >
      <button
        onClick={copySelected}
        type="button"
      >
        Copy selected
      </button>
      <button
        onClick={copyAll}
        type="button"
      >
        Copy all
      </button>
      {
        canPaste &&
        <button
          onClick={() => { toggleModal('pasteAppend'); }}
          type="button"
        >
          Paste (append)
        </button>
      }
      {
        canPaste &&
        <button
          onClick={() => { toggleModal('pasteReplace'); }}
          type="button"
        >
          Paste and replace
        </button>
      }
    </div>
  </ClickOutside>
);

ContextMenu.defaultProps = {
  canPaste: false,
  left: 0,
  show: false,
  top: 0,
};

ContextMenu.propTypes = {
  canPaste: PropTypes.bool,
  closeMenu: PropTypes.func.isRequired,
  copyAll: PropTypes.func.isRequired,
  copySelected: PropTypes.func.isRequired,
  left: PropTypes.number,
  show: PropTypes.bool,
  top: PropTypes.number,
  toggleModal: PropTypes.func.isRequired,
};

export default ContextMenu;
