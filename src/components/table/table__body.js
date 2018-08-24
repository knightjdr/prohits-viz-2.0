import PropTypes from 'prop-types';
import React from 'react';
import shortId from 'shortid';

const Body = ({
  columnOrder,
  columnTemplate,
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
  rows,
  scrollLeftPosition,
  width,
}) => (
  <div
    className="table__body-right"
    onTouchEnd={handleTouchEnd}
    onTouchMove={handleTouchMove}
    onTouchStart={handleTouchStart}
    style={{
      width,
    }}
  >
    <div
      className="table__body-right-inner"
      style={{
        gridTemplateColumns: columnTemplate,
        transform: `translate(${scrollLeftPosition}px)`,
      }}
    >
      {
        rows.map((row, rowNo) => (
          columnOrder.map((name, columnNo) => (
            <div
              className={`table__cell ${row[name].className}`}
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
  </div>
);

Body.propTypes = {
  columnOrder: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  columnTemplate: PropTypes.string.isRequired,
  handleTouchEnd: PropTypes.func.isRequired,
  handleTouchMove: PropTypes.func.isRequired,
  handleTouchStart: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  scrollLeftPosition: PropTypes.number.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default Body;
