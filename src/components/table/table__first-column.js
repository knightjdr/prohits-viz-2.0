import PropTypes from 'prop-types';
import React from 'react';
import shortId from 'shortid';

import HeaderCell from './table__header-cell';

import './table.css';

const FirstColumn = ({
  firstColumn,
  firstColumnRef,
  head,
  height,
  rows,
}) => (
  <div
    className="table__first-column"
    style={{
      minWidth: firstColumn.minWidth,
      width: firstColumn.width,
    }}
  >
    <div
      className="table__header"
    >
      <HeaderCell cell={head} />
    </div>
    <div
      className="table__first-column-body"
      ref={firstColumnRef}
      style={{ maxHeight: height }}
    >
      {
        rows.map(row => (
          <div
            className={row[firstColumn.name].className}
            key={shortId.generate()}
            style={row[firstColumn.name].style}
          >
            { row[firstColumn.name].content }
          </div>
        ))
      }
    </div>
  </div>
);

FirstColumn.propTypes = {
  firstColumn: PropTypes.shape({
    minWidth: PropTypes.number,
    name: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  firstColumnRef: PropTypes.shape({}).isRequired,
  head: PropTypes.shape({
    name: PropTypes.string,
    sortable: PropTypes.bool,
    sortDir: PropTypes.string,
    sortKey: PropTypes.string,
  }).isRequired,
  height: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default FirstColumn;
