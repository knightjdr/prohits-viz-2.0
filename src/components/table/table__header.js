import PropTypes from 'prop-types';
import React from 'react';

import HeaderCell from './table__header-cell';

import './table.css';

const Header = ({
  columns,
  columnTemplate,
  scrollLeftPosition,
  tableHeaderRef,
}) => (
  <div
    className="table__header-right"
    ref={tableHeaderRef}
  >
    <div
      className="table__header-right-inner"
      style={{
        gridTemplateColumns: columnTemplate,
        transform: `translate(${scrollLeftPosition}px)`,
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
  scrollLeftPosition: PropTypes.number.isRequired,
  tableHeaderRef: PropTypes.shape({}).isRequired,
};

export default Header;
