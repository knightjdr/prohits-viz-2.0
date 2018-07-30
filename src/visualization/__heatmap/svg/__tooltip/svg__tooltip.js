import PropTypes from 'prop-types';
import React from 'react';

import './svg__tooltip.css';

const Tooltip = ({
  display,
  left,
  text,
  top,
}) => (
  <div
    className="svg__tooltip"
    style={{
      left,
      opacity: display ? 1 : 0,
      top,
      transform: display ? 'scale(1)' : 'scale(0.8)',
      visibility: display ? 'visible' : 'hidden',
    }}
  >
    {text}
  </div>
);

Tooltip.defaultProps = {
  display: false,
  left: 0,
  text: '',
  top: 0,
};

Tooltip.propTypes = {
  display: PropTypes.bool,
  left: PropTypes.number,
  text: PropTypes.string,
  top: PropTypes.number,
};

export default Tooltip;
