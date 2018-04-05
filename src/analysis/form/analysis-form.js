import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import FileInput from './file/file-input-container';
import FormStepSelector from '../../state/selectors/form-step-selector';
import HeaderSelection from './header-selection/header-selection-container';
import NextStep from './next-step/next-step';
import Submit from './submit/submit';
import ToolSelection from './tool-selection/tool-selection';
import Validation from './validation/validation';
import { incrementFormStep } from '../../state/set/form-step-actions';

import './analysis-form.css';

export const AnalysisFormComponent = ({
  change,
  handleSubmit,
  nextStep,
  step,
}) => (
  <div className="Form-container">
    <Form onSubmit={handleSubmit}>
      <div className="Form-fields">
        <FileInput
          change={change}
        />
        <NextStep
          currentStep={step}
          needed={['file', 'fileType']}
          onClick={() => { nextStep(step); }}
          step={0}
        />
        {
          step > 0 &&
          <div>
            <ToolSelection />
            <NextStep
              currentStep={step}
              needed={['analysisType', 'file', 'fileType']}
              onClick={() => { nextStep(step); }}
              step={1}
              style={{ marginTop: 10 }}
            />
          </div>
        }
        {
          step > 1 &&
          <div>
            <HeaderSelection change={change} />
            <Submit />
          </div>
        }
      </div>
    </Form>
  </div>
);

AnalysisFormComponent.propTypes = {
  change: PropTypes.func.isRequired, // prop from reduxForm; use to set form programmatically
  handleSubmit: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  nextStep: (step) => {
    dispatch(incrementFormStep(step));
  },
});

/* istanbul ignore next */
const mapStateToProps = state => ({
  step: FormStepSelector(state),
});

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalysisFormComponent);

const connectedForm = reduxForm({
  destroyOnUnmount: false,
  form: 'analysisForm',
  touchOnBlur: false, // only validate on submit
  validate: Validation,
})(ConnectedComponent);

export default connectedForm;
