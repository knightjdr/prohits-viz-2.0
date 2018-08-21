import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faCaretDown, faCaretUp } from '@fortawesome/pro-solid-svg-icons';

const Header = ({
  columns,
}) => (
  <thead>
    <tr>
      {
        columns.map(column => (
          <th key={column.name}>
            { column.name }
            {
              column.sortable &&
              <button>
                { (!column.sortDir || column.sortDir === 'up') && <FontAwesomeIcon icon={faCaretUp} /> }
                { (!column.sortDir || column.sortDir === 'down') && <FontAwesomeIcon icon={faCaretDown} /> }
              </button>
            }
          </th>
        ))
      }
    </tr>
  </thead>
);

Header.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sortable: PropTypes.bool,
      sortDir: PropTypes.string,
      sortKey: PropTypes.string,
    }),
  ).isRequired,
};

export default Header;
