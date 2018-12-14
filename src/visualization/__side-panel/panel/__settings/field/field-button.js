import PropTypes from 'prop-types';
import React from 'react';
import { faSync } from '@fortawesome/pro-regular-svg-icons';

import RoundButton from '../../../../../components/round-button/round-button';

import './field.css';

const FieldButton = ({
  className,
  hasChanged,
  onClick,
  round,
}) => {
  const classes = ['panel__settings-field-button'];
  if (round) {
    classes.push('panel__settings-field-button_round');
  }
  if (className) {
    classes.push(className);
  }
  return (
    <RoundButton
      className={classes.join(' ')}
      icon={faSync}
      onClick={onClick}
      size="1x"
      theme={hasChanged ? 'success' : 'default'}
    />
  );
};

FieldButton.defaultProps = {
  className: null,
  hasChanged: false,
  round: false,
};

FieldButton.propTypes = {
  className: PropTypes.string,
  hasChanged: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  round: PropTypes.bool,
};

export default FieldButton;
