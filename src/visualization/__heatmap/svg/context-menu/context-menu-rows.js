import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import ContextMenuHoc from '../../../../components/context-menu/context-menu-hoc';

const ContextMenuRows = ({
  closeMenu,
  setSelections,
  target,
}) => (
  <Fragment>
    <button
      onClick={() => {
        closeMenu();
        setSelections([target], 'rows', 'rowsSelected');
      }}
      type="button"
    >
      Select row
    </button>
  </Fragment>
);

ContextMenuRows.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  setSelections: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
};

export default ContextMenuHoc(ContextMenuRows);
