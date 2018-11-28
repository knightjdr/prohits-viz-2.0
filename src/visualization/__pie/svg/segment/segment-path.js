import PropTypes from 'prop-types';
import React from 'react';

import './segment.css';

const SegmentPath = ({
  handleMouseEnter,
  handleMouseLeave,
  path,
  segment,
}) => {
  const mouseEnter = () => {
    handleMouseEnter(segment.abundance, segment.readout, segment.text);
  };
  const mouseLeave = () => {
    handleMouseLeave(segment.readout);
  };
  return (
    <g
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <path
        className="segment__backdrop"
        d={path}
        fill="#ffffff"
      />
      <path
        className="segment__path"
        d={path}
        fill={segment.fill}
        stroke="#f5f5f5"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </g>
  );
};

SegmentPath.propTypes = {
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  segment: PropTypes.shape({
    fill: PropTypes.string,
    readout: PropTypes.string,
    text: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
};

export default SegmentPath;
