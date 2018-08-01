import PropTypes from 'prop-types';
import React from 'react';
import ShortID from 'shortid';

const Annotations = ({
  annotations,
  cursor,
  fontSize,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  height,
  setRef,
  show,
  width,
}) => (
  show &&
  <g
    ref={setRef}
    transform="translate(100 100)"
  >
    <rect
      cursor={cursor}
      fill="rgba(0, 0, 0, 0)"
      height={height}
      onMouseMove={(e) => { handleMouseMove(e); }}
      onMouseUp={handleMouseUp}
      x="0"
      y="0"
      width={width}
    />
    {
      annotations.map((annotation, index) => (
        <text
          cursor="pointer"
          fontSize={fontSize}
          key={ShortID.generate()}
          onMouseDown={() => { handleMouseDown(index); }}
          onMouseMove={(e) => { handleMouseMove(e); }}
          onMouseUp={handleMouseUp}
          textAnchor="middle"
          x={annotation.x}
          y={annotation.y}
        >
          {annotation.text}
        </text>
      ))
    }
  </g>
);

Annotations.defaultProps = {
  show: true,
};

Annotations.propTypes = {
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ).isRequired,
  cursor: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  setRef: PropTypes.shape({}).isRequired,
  show: PropTypes.bool,
  width: PropTypes.number.isRequired,
};

export default Annotations;
