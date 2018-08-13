import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import './round-button.css';

const RoundButton = ({
  className,
  handleClick,
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
      onClick={handleClick}
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
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.shape({}).isRequired,
};

export default RoundButton;
