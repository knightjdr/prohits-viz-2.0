import PropTypes from 'prop-types';
import React from 'react';

import Body from './table__body';
import Header from './table__header';

import './table.css';

const Table = ({
  columns,
  columnOrder,
  height,
  rows,
  setRef,
}) => (
  <table
    className="table"
    ref={setRef}
  >
    <Header columns={columns} />
    <Body
      height={height}
      columnOrder={columnOrder}
      rows={rows}
    />
  </table>
);

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      contentAlign: PropTypes.string,
      name: PropTypes.string,
      sortable: PropTypes.bool,
      sortDir: PropTypes.string,
      sortKey: PropTypes.string,
    }),
  ).isRequired,
  columnOrder: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  height: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  setRef: PropTypes.shape({}).isRequired,
};

export default Table;
