import PropTypes from 'prop-types';
import React from 'react';

import './text.css';

const Text = ({
  text,
}) => (
  <g transform="scale(0.8)">
    {
      text.map(details => (
        <g
          className="pie__text"
          key={details.id}
          transform={`rotate(90 ${details.x} ${details.y})`}
        >
          <rect
            fill="#fff"
            height="24"
            rx="2"
            ry="2"
            x={details.x}
            y={details.y - 17}
            width={details.width}
          />
          <text
            fontSize="16px"
            x={details.x + 2}
            y={details.y}
          >
            {`${details.string}`}
          </text>
        </g>
      ))
    }
  </g>
);

Text.propTypes = {
  text: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      string: PropTypes.string,
      width: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ).isRequired,
};

export default Text;
