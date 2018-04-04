import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form } from 'antd';
import { connect } from 'react-redux';

import FileInput from './file/file-input-container';
import FormStepSelector from '../../state/selectors/form-step-selector';
import HeaderSelection from './header-selection/header-selection';
import NextStep from './next-step/next-step';
import ToolSelection from './tool-selection/tool-selection';
import { incrementFormStep } from '../../state/set/form-step-actions';

import './analysis-form.css';

export const AnalysisFormComponent = ({
  change,
  form,
  nextStep,
  onSubmit,
  step,
}) => {
  const { getFieldDecorator, setFieldsValue } = form;
  return (
    <div className="Form-container">
      <Form>
        <div className="Form-fields">
          <FileInput
            change={change}
            getFieldDecorator={getFieldDecorator}
            setFieldsValue={setFieldsValue}
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
              <ToolSelection getFieldDecorator={getFieldDecorator} />
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
              <HeaderSelection getFieldDecorator={getFieldDecorator} />
              <div>
                Hit the submit button when ready or customize advanced options. Your
                current analysis will include all preys with an FDR meeting the filter
                of 0.01 and with at least 0 AvgSpec.
              </div>
              <div className="Form-submit-container">
                <Button
                  className="success-button"
                  onClick={(e) => { onSubmit(e, form); }}
                >
                  Submit
                </Button>
                <Button
                  className="Form-options-button"
                  type="primary"
                >
                  Options
                </Button>
              </div>
            </div>
          }
        </div>
      </Form>
    </div>
  );
};

AnalysisFormComponent.propTypes = {
  change: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired,
  nextStep: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
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

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalysisFormComponent);

export default Form.create()(ConnectedContainer);
