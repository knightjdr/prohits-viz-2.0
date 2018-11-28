import PropTypes from 'prop-types';
import React from 'react';

import SegmentPath from './segment-path';

const Segment = ({
  handleMouseEnter,
  handleMouseLeave,
  radii,
  segments,
}) => (
  <g transform="scale(0.8)">
    {
      segments.map((segment) => {
        const path = `
          M ${segment.a.x} ${segment.a.y}
          A ${radii.full} ${radii.full} 0 ${segment.b.arc} 1 ${segment.b.x} ${segment.b.y}
          L ${segment.c.x} ${segment.c.y}
          A ${radii.segment} ${radii.segment} 0 ${segment.d.arc} 0 ${segment.d.x} ${segment.d.y}
          Z
        `;
        return (
          <SegmentPath
            key={segment.readout}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            path={path}
            segment={segment}
          />
        );
      })
    }
  </g>
);

Segment.propTypes = {
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  radii: PropTypes.shape({
    full: PropTypes.number,
    segment: PropTypes.number,
    text: PropTypes.number,
  }).isRequired,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      a: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      abundance: PropTypes.number,
      b: PropTypes.shape({
        arc: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      c: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      d: PropTypes.shape({
        arc: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      fill: PropTypes.string,
      readout: PropTypes.string,
      text: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    }),
  ).isRequired,
};

export default Segment;
