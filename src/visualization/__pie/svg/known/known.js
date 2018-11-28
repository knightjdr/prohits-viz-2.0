import PropTypes from 'prop-types';
import React from 'react';

import './known.css';

const Known = ({
  end,
  radius,
}) => (
  <path
    className="known__path"
    d={`
      M ${radius} 0
      A ${radius} ${radius} 0 ${end.arc} 1 ${end.x} ${end.y}
    `}
    fill="none"
    stroke="#000"
    strokeWidth="3"
    transform="scale(0.62 0.62)"
  />
);

Known.propTypes = {
  end: PropTypes.shape({
    arc: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  radius: PropTypes.number.isRequired,
};

export default Known;
