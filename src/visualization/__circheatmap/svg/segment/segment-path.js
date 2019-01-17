import PropTypes from 'prop-types';
import React from 'react';

import './segment.css';

const SegmentPath = ({
  circleIndex,
  handleMouseEnter,
  handleMouseLeave,
  path,
  segment,
  segmentIndex,
}) => {
  const mouseEnter = () => {
    handleMouseEnter(circleIndex, segmentIndex);
  };
  const mouseLeave = () => {
    handleMouseLeave(segmentIndex);
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
  circleIndex: PropTypes.number.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  segment: PropTypes.shape({
    fill: PropTypes.string,
  }).isRequired,
  segmentIndex: PropTypes.number.isRequired,
};

export default SegmentPath;
