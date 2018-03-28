import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';

import IsNotEmpty from '../../../helpers/is-not-empty';

import './next-step.css';

const NextStep = ({
  currentStep,
  getFieldValue,
  needed,
  onClick,
  step,
  style,
}) => {
  /* only show the button if it is the buttons step, and the needed fields have
  ** been populated */
  const show = currentStep === step && needed.every(field => (
    IsNotEmpty(getFieldValue(field))
  ));
  const buttonElement = show ?
    (
      <div
        className="NextStep-container"
        style={style}
      >
        <Button
          className="NextStep-button pulse-button-primary"
          onClick={onClick}
          type="primary"
        >
          Next
        </Button>
      </div>
    )
    :
    null;
  return buttonElement;
};

NextStep.defaultProps = {
  style: {},
};

NextStep.propTypes = {
  currentStep: PropTypes.number.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  needed: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
};

export default NextStep;
