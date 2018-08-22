import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faCaretDown, faCaretUp } from '@fortawesome/pro-solid-svg-icons';

import './table.css';

const HeaderCell = ({
  cell,
}) => (
  <div
    className="table__header-cell"
    key={cell.name}
  >
    { cell.name }
    {
      cell.sortable &&
      <button>
        { (!cell.sortDir || cell.sortDir === 'up') && <FontAwesomeIcon icon={faCaretUp} /> }
        { (!cell.sortDir || cell.sortDir === 'down') && <FontAwesomeIcon icon={faCaretDown} /> }
      </button>
    }
  </div>
);

HeaderCell.propTypes = {
  cell: PropTypes.shape({
    name: PropTypes.string,
    sortable: PropTypes.bool,
    sortDir: PropTypes.string,
    sortKey: PropTypes.string,
  }).isRequired,
};

export default HeaderCell;
