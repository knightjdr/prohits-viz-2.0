import PropTypes from 'prop-types';
import React from 'react';

import './heatmap-svg__status.css';

const OptionButton = ({
  children,
  className,
  onClick,
  tooltip,
}) => {
  const classes = ['heatmap-svg__status-button'];
  if (className) {
    classes.push(className);
  }
  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      tooltip={tooltip}
      tooltip-position="left"
      type="button"
    >
      { children }
    </button>
  );
};

OptionButton.defaultProps = {
  className: null,
};

OptionButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default OptionButton;
