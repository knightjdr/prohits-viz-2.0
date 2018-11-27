import PropTypes from 'prop-types';
import React from 'react';

import './pie-svg__plot.css';

const Segment = ({
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
          <g key={segment.readout}>
            <path
              className="pie-svg__segment-backdrop"
              d={path}
              fill="#ffffff"
            />
            <g>
              <path
                className="pie-svg__segment-path"
                d={path}
                fill={segment.fill}
                stroke="#f5f5f5"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <text
                alignmentBaseline={segment.text.alignment}
                className="pie-svg__segment-text"
                fontSize="1rem"
                textAnchor={segment.text.anchor}
                transform={`rotate(90 ${segment.text.x} ${segment.text.y})`}
                x={segment.text.x}
                y={segment.text.y}
              >
                {`${segment.readout}: ${segment.abundance}`}
              </text>
            </g>
          </g>
        );
      })
    }
  </g>
);

Segment.propTypes = {
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
        alignment: PropTypes.string,
        anchor: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    }),
  ).isRequired,
};

export default Segment;
