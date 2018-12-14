import PropTypes from 'prop-types';
import React from 'react';

import './button.css';

const Button = ({
  children,
  className,
  disabled,
  theme,
  type,
  ...otherProps
}) => {
  const classes = disabled ? ['button_disabled'] : [`button_${theme}`];
  if (className) {
    classes.push(className);
  }
  return (
    <button
      className={classes.join(' ')}
      type={type}
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
  theme: 'default',
  type: 'button',
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  theme: PropTypes.oneOf([
    'default',
    'disabled',
    'light',
    'success',
    'warning',
  ]),
  type: PropTypes.string,
};

export default Button;
