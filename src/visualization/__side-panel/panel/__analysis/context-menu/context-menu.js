import PropTypes from 'prop-types';
import React from 'react';

import './context-menu.css';

const ContextMenu = ({
  canPaste,
  left,
  show,
  top,
}) => (
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
);

ContextMenu.propTypes = {
  canPaste: PropTypes.bool.isRequired,
  left: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  top: PropTypes.number.isRequired,
};

export default ContextMenu;
