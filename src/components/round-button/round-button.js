import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import './round-button.css';

const RoundButton = ({
  className,
  icon,
  onClick,
  size,
  theme,
  type,
  ...otherProps
}) => {
  const classes = ['round-button', `round-button_${theme}`];
  if (className) {
    classes.push(className);
  }
  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      type={type}
      {...otherProps}
    >
      <FontAwesomeIcon icon={icon} size={size} />
    </button>
  );
};

RoundButton.defaultProps = {
  className: null,
  onClick: null,
  size: 'lg',
  theme: 'default',
  type: 'button',
};

RoundButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func,
  size: PropTypes.string,
  theme: PropTypes.oneOf([
    'default',
    'disabled',
    'light',
    'success',
    'transparent',
    'warning',
  ]),
  type: PropTypes.string,
};

export default RoundButton;
