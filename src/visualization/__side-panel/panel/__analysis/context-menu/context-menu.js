import PropTypes from 'prop-types';
import React from 'react';

import ClickOutside from '../../../../../components/click-outside/click-outside';

import './context-menu.css';

const ContextMenu = ({
  canPaste,
  closeMenu,
  left,
  show,
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
      <div>
        Copy selected
      </div>
      <div>
        Copy all
      </div>
      {
        canPaste &&
        <div>
          Paste (append)
        </div>
      }
      {
        canPaste &&
        <div>
          Paste and replace
        </div>
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
  left: PropTypes.number,
  show: PropTypes.bool,
  top: PropTypes.number,
};

export default ContextMenu;
