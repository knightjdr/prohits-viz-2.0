import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import ContextMenuHoc from '../../../../../../components/context-menu/context-menu-hoc';

export const ContextMenu = ({
  canPaste,
  copyAll,
  copySelected,
  toggleModal,
}) => (
  <Fragment>
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
  </Fragment>
);

ContextMenu.defaultProps = {
  canPaste: false,
};

ContextMenu.propTypes = {
  canPaste: PropTypes.bool,
  copyAll: PropTypes.func.isRequired,
  copySelected: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ContextMenuHoc(ContextMenu);
