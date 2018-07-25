import PropTypes from 'prop-types';
import React from 'react';

import ClickOutside from '../../../../components/click-outside/click-outside';

import './context-menu.css';

const ContextMenu = ({
  closeMenu,
  left,
  reference,
  setReference,
  show,
  sortRows,
  target,
  top,
}) => (
  <ClickOutside callback={closeMenu}>
    <div
      className="context-menu-column"
      style={{
        left,
        opacity: show ? 1 : 0,
        top,
        visibility: show ? 'visible' : 'hidden',
      }}
    >
      <button
        onClick={() => {
          closeMenu();
          sortRows(true, target, 'asc');
        }}
        type="button"
      >
        Sort ascending
      </button>
      <button
        onClick={() => {
          closeMenu();
          sortRows(true, target, 'desc');
        }}
        type="button"
      >
        Sort descending
      </button>
      {
        reference !== target ?
          <button
            onClick={() => {
              closeMenu();
              setReference(target);
            }}
            type="button"
          >
            Set as reference
          </button>
          :
          <button
            onClick={() => {
              closeMenu();
              setReference(null);
            }}
            type="button"
          >
            Unset as reference
          </button>
      }
    </div>
  </ClickOutside>
);

ContextMenu.defaultProps = {
  left: 0,
  reference: null,
  show: false,
  top: 0,
};

ContextMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  left: PropTypes.number,
  reference: PropTypes.string,
  setReference: PropTypes.func.isRequired,
  show: PropTypes.bool,
  sortRows: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
  top: PropTypes.number,
};

export default ContextMenu;
