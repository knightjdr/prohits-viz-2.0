import PropTypes from 'prop-types';
import React from 'react';
import nanoid from 'nanoid';

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
      rows.map((row) => {
        const key = `firstcolumn${nanoid()}`;
        return (
          <div
            className={`table__cell ${row[firstColumn.name].className}`}
            key={key}
            style={{
              ...row[firstColumn.name].style,
              height: cellHeight,
            }}
          >
            { row[firstColumn.name].content }
          </div>
        );
      })
    }
  </div>
);

FirstColumn.propTypes = {
  cellHeight: PropTypes.number.isRequired,
  firstColumn: PropTypes.shape({
    minWidth: PropTypes.number,
    name: PropTypes.string,
    width: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default FirstColumn;
