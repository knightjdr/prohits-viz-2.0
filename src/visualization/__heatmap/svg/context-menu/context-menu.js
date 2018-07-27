import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import ContextMenuHoc from '../../../../components/context-menu/context-menu-hoc';

const ContextMenu = ({
  closeMenu,
  reference,
  setReference,
  sortRows,
  target,
}) => (
  <Fragment>
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
  </Fragment>
);

ContextMenu.defaultProps = {
  reference: null,
};

ContextMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  reference: PropTypes.string,
  setReference: PropTypes.func.isRequired,
  sortRows: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
};

export default ContextMenuHoc(ContextMenu);
