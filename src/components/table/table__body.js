import PropTypes from 'prop-types';
import React from 'react';
import shortId from 'shortid';

const Body = ({
  bodyRef,
  columnOrder,
  columnTemplate,
  handleScroll,
  height,
  rows,
}) => (
  <div
    className="table__body"
    onScroll={handleScroll}
    ref={bodyRef}
    style={{
      gridTemplateColumns: columnTemplate,
      maxHeight: height,
    }}
  >
    {
      rows.map((row, rowNo) => (
        columnOrder.map((name, columnNo) => (
          <div
            className={row[name].className}
            key={shortId.generate()}
            style={{
              ...{
                gridColumn: columnNo + 1,
                gridRow: rowNo + 2,
              },
              ...row[name].style,
            }}
          >
            { row[name].content }
          </div>
        ))
      ))
    }
  </div>
);

Body.propTypes = {
  bodyRef: PropTypes.shape({}).isRequired,
  columnOrder: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  columnTemplate: PropTypes.string.isRequired,
  handleScroll: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default Body;
