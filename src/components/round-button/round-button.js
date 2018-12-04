import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import './round-button.css';

const RoundButton = ({
  className,
  icon,
  onClick,
  size,
  type,
  ...otherProps
}) => {
  const classes = ['round-button', `round-button_${type}`];
  if (className) {
    classes.push(className);
  }
  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      type="button"
      {...otherProps}
    >
      <FontAwesomeIcon icon={icon} size={size} />
    </button>
  );
};

RoundButton.defaultProps = {
  className: null,
  size: 'lg',
  type: 'default',
};

RoundButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  type: PropTypes.string,
};

export default RoundButton;
