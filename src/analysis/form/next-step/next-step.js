import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';
import IsNotEmpty from '../../../helpers/is-not-empty';

import './next-step.css';

export const NextStepComponent = ({
  currentStep,
  form,
  needed,
  onClick,
  step,
  style,
}) => {
  /* only show the button if it is the buttons step, and the needed fields have
  ** been populated */
  const show = currentStep === step && needed.every(field => (
    IsNotEmpty(form[field])
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

NextStepComponent.defaultProps = {
  currentStep: 0,
  needed: [],
  style: {},
};

NextStepComponent.propTypes = {
  currentStep: PropTypes.number,
  form: PropTypes.shape({}).isRequired,
  needed: PropTypes.arrayOf(
    PropTypes.string,
  ),
  onClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: AnalysisFormSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(NextStepComponent);

export default ConnectedContainer;
