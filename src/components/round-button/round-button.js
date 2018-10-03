import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import './round-button.css';

const RoundButton = ({
  className,
  onClick,
  icon,
  ...otherProps
}) => {
  const classes = ['round-button'];
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
      <FontAwesomeIcon icon={icon} size="lg" />
    </button>
  );
};

RoundButton.defaultProps = {
  className: null,
};

RoundButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.shape({}).isRequired,
};

export default RoundButton;
