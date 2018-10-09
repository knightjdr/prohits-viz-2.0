import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import FileInput from './file/file-input-container';
import FormStepSelector from '../../state/selectors/form-step-selector';
import HeaderSelection from './header-selection/header-selection-container';
import NextStep from './next-step/next-step';
import Options from './options/options';
import Status from './status/status-container';
import Submit from './submit/submit';
import SubmitError from './submission/error';
import ToolSelection from './tool-selection/tool-selection';
import Validation from './validation/validation';
import { incrementFormStep } from '../../state/set/form-step-actions';

import './analysis-form.css';

export const AnalysisFormComponent = ({
  analysisError,
  change,
  closeError,
  closeStatus,
  errors,
  handleOptions,
  handleSubmit,
  nextStep,
  handleReset,
  showOptions,
  step,
  taskID,
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
            <Submit
              errors={errors}
              handleOptions={handleOptions}
              handleReset={handleReset}
              showOptions={showOptions}
            />
            <Options
              change={change}
              show={showOptions}
            />
          </div>
        }
      </div>
    </Form>
    <SubmitError
      closeModal={closeError}
      visible={analysisError}
    />
    {
      taskID &&
      <Status
        closeModal={closeStatus}
        taskID={taskID}
      />
    }
  </div>
);

AnalysisFormComponent.defaultProps = {
  taskID: null,
};

AnalysisFormComponent.propTypes = {
  analysisError: PropTypes.bool.isRequired,
  // prop from reduxForm; use to set form values programmatically
  change: PropTypes.func.isRequired,
  closeError: PropTypes.func.isRequired,
  closeStatus: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  handleOptions: PropTypes.func.isRequired,
  // onSubmit prop converted to handleSubmit by redux form
  handleSubmit: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  showOptions: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  taskID: PropTypes.string,
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
  enableReinitialize: true,
  form: 'analysisForm',
  touchOnBlur: false, // only validate on submit
  validate: Validation,
})(ConnectedComponent);

export default connectedForm;
