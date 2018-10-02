import PropTypes from 'prop-types';
import React from 'react';
import shortId from 'shortid';

import './table.css';

const FirstColumn = ({
  cellHeight,
  firstColumn,
  rows,
}) => (
  <div
    className="table__first-column"
    style={{
      minWidth: firstColumn.minWidth,
      width: firstColumn.width || 'auto',
    }}
  >
    {
      rows.map(row => (
        <div
          className={`table__cell ${row[firstColumn.name].className}`}
          key={shortId.generate()}
          style={{
            ...row[firstColumn.name].style,
            height: cellHeight,
          }}
        >
          { row[firstColumn.name].content }
        </div>
      ))
    }
  </div>
);

FirstColumn.propTypes = {
  cellHeight: PropTypes.number.isRequired,
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
