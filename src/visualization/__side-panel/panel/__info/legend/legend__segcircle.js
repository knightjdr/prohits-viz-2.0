import PropTypes from 'prop-types';
import React from 'react';

import colorGradient from '../../../../color/color-gradient';

const SegCircleLegend = ({
  known,
  segments,
}) => {
  const height = (segments.length * 70) + 60;
  return (
    <svg
      id="legend"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width="200"
      viewBox={`0 0 200 ${height}`}
    >
      {
        segments.map((segment, index) => {
          const gradientFill = colorGradient(segment.color, 101, false);
          const numColors = gradientFill.length;
          const halfColorIndex = Math.floor(numColors / 2);
          return (
            <g
              key={segment.name}
              transform={`translate(0 ${index * 70})`}
            >
              <defs>
                <linearGradient id={`${segment.name}-legendGradient`}>
                  <stop offset="0%" stopColor={gradientFill[0]} />
                  <stop offset="50%" stopColor={gradientFill[halfColorIndex]} />
                  <stop offset="100%" stopColor={gradientFill[numColors - 1]} />
                </linearGradient>
              </defs>
              <g>
                <text x="100" y="20" textAnchor="middle">
                  {segment.name}
                </text>
                <rect x="25" y="30" height="20" width="150" fill={`url('#${segment.name}-legendGradient')`} />
                <text x="25" y="65" textAnchor="middle">
                  {segment.minAbundance}
                </text>
                <text x="175" y="65" textAnchor="middle">
                  {segment.abundanceCap}
                </text>
              </g>
            </g>
          );
        })
      }
      {
        known
        && (
          <g transform={`translate(0 ${height - 40})`}>
            <text
              textAnchor="middle"
              x="100"
              y="0"
            >
              Known
            </text>
            <line
              stroke="black"
              strokeWidth="3"
              x1="50"
              x2="150"
              y1="10"
              y2="10"
            />
          </g>
        )
      }
    </svg>
  );
};

SegCircleLegend.propTypes = {
  known: PropTypes.bool.isRequired,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      abundanceCap: PropTypes.number,
      color: PropTypes.string,
      minAbundance: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default SegCircleLegend;
