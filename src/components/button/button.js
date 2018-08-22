import PropTypes from 'prop-types';
import React from 'react';

import './button.css';

const Button = ({
  children,
  className,
  handleClick,
  type,
  ...otherProps
}) => {
  const classes = [`button_${type}`];
  if (className) {
    classes.push(className);
  }
  return (
    <button
      className={classes.join(' ')}
      onClick={handleClick}
      type="button"
      {...otherProps}
    >
      { children }
    </button>
  );
};

Button.defaultProps = {
  className: null,
  type: 'default',
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Button;
