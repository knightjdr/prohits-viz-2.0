import PropTypes from 'prop-types';
import React from 'react';

import './enrichment.css';

const Enrichment = ({
  radius,
  slices,
}) => (
  <g transform="scale(0.5 0.5)">
    {
      slices.map(slice => (
        <path
          className="enrichment__slice"
          d={`
            M ${slice.m.x} ${slice.m.y}
            A ${radius} ${radius} 0 ${slice.a.arc} 1 ${slice.a.x} ${slice.a.y}
            L 0 0
            Z
          `}
          fill={slice.fill}
          key={slice.term}
          stroke="#f5f5f5"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      ))
    }
  </g>
);

Enrichment.propTypes = {
  radius: PropTypes.number.isRequired,
  slices: PropTypes.arrayOf(
    PropTypes.shape({
      a: PropTypes.shape({
        arc: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      fill: PropTypes.string,
      m: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      term: PropTypes.string,
    }),
  ).isRequired,
};

export default Enrichment;
