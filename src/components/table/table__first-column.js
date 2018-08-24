import PropTypes from 'prop-types';
import React from 'react';
import shortId from 'shortid';

import './table.css';

const FirstColumn = ({
  firstColumn,
  rows,
}) => (
  <div
    className="table__first-column"
    style={{
      minWidth: firstColumn.minWidth,
      width: firstColumn.width,
    }}
  >
    {
      rows.map(row => (
        <div
          className={`table__cell ${row[firstColumn.name].className}`}
          key={shortId.generate()}
          style={row[firstColumn.name].style}
        >
          { row[firstColumn.name].content }
        </div>
      ))
    }
  </div>
);

FirstColumn.propTypes = {
  firstColumn: PropTypes.shape({
    minWidth: PropTypes.number,
    name: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default FirstColumn;
