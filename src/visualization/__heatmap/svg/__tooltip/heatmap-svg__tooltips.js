import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const Tooltips = ({
  clearTooltip,
  handleMouseMove,
  height,
  mouseEvents,
  setRef,
  width,
}) => (
  <Fragment>
    <g
      ref={setRef}
      pointerEvents={mouseEvents ? 'auto' : 'none'}
      transform="translate(100 100)"
    >
      <rect
        fill="black"
        height={height}
        onMouseLeave={clearTooltip}
        onMouseMove={handleMouseMove}
        opacity="0"
        x="0"
        y="0"
        width={width}
      />
    </g>
  </Fragment>
);

Tooltips.propTypes = {
  clearTooltip: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  mouseEvents: PropTypes.bool.isRequired,
  setRef: PropTypes.shape({}).isRequired,
  width: PropTypes.number.isRequired,
};

export default Tooltips;
