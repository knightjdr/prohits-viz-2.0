import PropTypes from 'prop-types';
import React from 'react';

import Body from './table__body';
import FirstColumn from './table__first-column';
import Header from './table__header';
import HeaderCell from './table__header-cell';
import HorizontalScroll from './table__horizontal-scroll';

import './table.css';

const Table = ({
  bodyInnerWidth,
  bodyRef,
  bodyWidth,
  columns,
  columnOrder,
  columnTemplate,
  firstColumn,
  handleScroll,
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
  height,
  maxBodyWidth,
  rows,
  scrollLeftOffset,
  scrollLeftPosition,
  scrollLeftWidth,
  tableHeaderRef,
  tableRef,
}) => (
  <div
    className="table"
    ref={tableRef}
  >
    <div className="table__header">
      <div
        style={{
          minWidth: firstColumn.minWidth,
          width: firstColumn.width,
        }}
      >
        <HeaderCell cell={columns[0]} />
      </div>
      <Header
        columns={columns.slice(1)}
        columnTemplate={columnTemplate}
        scrollLeftPosition={scrollLeftPosition}
        tableHeaderRef={tableHeaderRef}
      />
    </div>
    <div
      className="table__body"
      ref={bodyRef}
      style={{
        maxHeight: height,
        width: bodyWidth,
      }}
    >
      <FirstColumn
        firstColumn={firstColumn}
        rows={rows}
      />
      <Body
        columnOrder={columnOrder}
        columnTemplate={columnTemplate}
        handleTouchEnd={handleTouchEnd}
        handleTouchMove={handleTouchMove}
        handleTouchStart={handleTouchStart}
        rows={rows}
        scrollLeftPosition={scrollLeftPosition}
        width={bodyInnerWidth}
      />
    </div>
    <HorizontalScroll
      handleScroll={handleScroll}
      left={scrollLeftOffset}
      maxBodyWidth={maxBodyWidth}
      width={scrollLeftWidth}
    />
  </div>
);

Table.defaultProps = {
  bodyInnerWidth: 'auto',
  bodyWidth: 'auto',
};

Table.propTypes = {
  bodyInnerWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  bodyRef: PropTypes.shape({}).isRequired,
  bodyWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
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
  handleScroll: PropTypes.func.isRequired,
  handleTouchEnd: PropTypes.func.isRequired,
  handleTouchMove: PropTypes.func.isRequired,
  handleTouchStart: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  maxBodyWidth: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  scrollLeftOffset: PropTypes.number.isRequired,
  scrollLeftPosition: PropTypes.number.isRequired,
  scrollLeftWidth: PropTypes.number.isRequired,
  tableHeaderRef: PropTypes.shape({}).isRequired,
  tableRef: PropTypes.shape({}).isRequired,
};

export default Table;
