import PropTypes from 'prop-types';
import React from 'react';

import HeaderCell from './table__header-cell';

import './table.css';

const Header = ({
  columns,
  columnTemplate,
}) => (
  <div
    className="table__header"
    style={{
      gridTemplateColumns: columnTemplate,
    }}
  >
    {
      columns.map(column => (
        <HeaderCell
          cell={column}
          key={column.name}
        />
      ))
    }
  </div>
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
  columnTemplate: PropTypes.string.isRequired,
};

export default Header;
