import React from 'react';
import PropTypes from 'prop-types';

const HorizontalScroll = ({
  handleScroll,
  left,
  maxBodyWidth,
  width,
}) => (
  typeof width === 'number' && width <= 600 ?
    <div
      className="table__horizontal-scroll"
      onScroll={handleScroll}
      style={{
        transform: `translate(${left}px)`,
        width,
      }}
    >
      <div style={{ width: maxBodyWidth }} />
    </div>
    : null
);

HorizontalScroll.propTypes = {
  handleScroll: PropTypes.func.isRequired,
  left: PropTypes.number.isRequired,
  maxBodyWidth: PropTypes.number.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default HorizontalScroll;
