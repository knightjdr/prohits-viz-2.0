import PropTypes from 'prop-types';
import React from 'react';

import './button.css';

const Button = ({
  children,
  className,
  disabled,
  type,
  ...otherProps
}) => {
  const classes = disabled ? ['button_disabled'] : [`button_${type}`];
  if (className) {
    classes.push(className);
  }
  return (
    <button
      className={classes.join(' ')}
      type="button"
      {...otherProps}
    >
      { children }
    </button>
  );
};

Button.defaultProps = {
  children: 'button',
  className: null,
  disabled: false,
  type: 'default',
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf([
    'default',
    'disabled',
    'light',
    'success',
    'warning',
  ]),
};

export default Button;
