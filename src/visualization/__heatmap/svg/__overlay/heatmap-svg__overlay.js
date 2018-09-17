import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const Overlay = ({
  cursor,
  handleMouseMove,
  handleMouseUp,
  handleMouseDown,
  height,
  marker,
  setRef,
  width,
}) => (
  <Fragment>
    <g
      ref={setRef}
      transform="translate(100 100)"
    >
      {
        marker.show &&
        <rect
          cursor="crosshair"
          fill="black"
          fillOpacity="0.4"
          height={marker.height}
          onMouseMove={(e) => { handleMouseMove(e); }}
          onMouseUp={handleMouseUp}
          stroke="#000"
          strokeOpacity="0.8"
          strokeWidth="1"
          x={marker.x}
          y={marker.y}
          width={marker.width}
        />
      }
      <rect
        cursor={cursor}
        fill="black"
        height={height}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseMove={(e) => { handleMouseMove(e); }}
        onMouseUp={handleMouseUp}
        opacity="0"
        x="0"
        y="0"
        width={width}
      />
    </g>
  </Fragment>
);

Overlay.propTypes = {
  cursor: PropTypes.string.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  marker: PropTypes.shape({
    height: PropTypes.number,
    show: PropTypes.bool,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  setRef: PropTypes.shape({}).isRequired,
  width: PropTypes.number.isRequired,
};

export default Overlay;
