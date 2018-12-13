import PropTypes from 'prop-types';
import React from 'react';
import nanoid from 'nanoid';

const Body = ({
  cellHeight,
  columnOrder,
  columnTemplate,
  rows,
  scrollLeftPosition,
  width,
}) => (
  <div
    className="table__body-right"
    style={{ width }}
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
          columnOrder.map((name, columnNo) => {
            const className = row[name] && row[name].className;
            const content = row[name] && row[name].content;
            const key = `bodycell${nanoid()}`;
            const style = row[name] && row[name].style ? row[name].style : {};
            return (
              <div
                className={`table__cell ${className}`}
                key={key}
                style={{
                  ...{
                    gridColumn: columnNo + 1,
                    gridRow: rowNo + 2,
                  },
                  ...style,
                  height: cellHeight - 10,
                }}
              >
                { content }
              </div>
            );
          })
        ))
      }
    </div>
  </div>
);

Body.propTypes = {
  cellHeight: PropTypes.number.isRequired,
  columnOrder: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  columnTemplate: PropTypes.string.isRequired,
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
