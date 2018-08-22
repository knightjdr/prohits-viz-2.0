import PropTypes from 'prop-types';
import React from 'react';

import Body from './table__body';
import FirstColumn from './table__first-column';
import Header from './table__header';

import './table.css';

const Table = ({
  bodyRef,
  columns,
  columnOrder,
  columnTemplate,
  firstColumn,
  firstColumnRef,
  handleScroll,
  height,
  rows,
  tableRef,
}) => (
  <div
    className="table"
    ref={tableRef}
  >
    <FirstColumn
      firstColumn={firstColumn}
      firstColumnRef={firstColumnRef}
      head={columns[0]}
      height={height}
      rows={rows}
    />
    <div
      className="table__inner"
      style={{
        maxHeight: height + 48,
      }}
    >
      <div className="table__inner-overflow">
        <Header
          columns={columns.slice(1)}
          columnTemplate={columnTemplate}
        />
        <Body
          bodyRef={bodyRef}
          columnOrder={columnOrder}
          columnTemplate={columnTemplate}
          handleScroll={handleScroll}
          height={height}
          rows={rows}
        />
      </div>
    </div>
  </div>
);

Table.propTypes = {
  bodyRef: PropTypes.shape({}).isRequired,
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
  columnTemplate: PropTypes.string.isRequired,
  firstColumn: PropTypes.shape({
    minWidth: PropTypes.number,
    name: PropTypes.string,
    width: PropTypes.string,
  }).isRequired,
  firstColumnRef: PropTypes.shape({}).isRequired,
  handleScroll: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  tableRef: PropTypes.shape({}).isRequired,
};

export default Table;
