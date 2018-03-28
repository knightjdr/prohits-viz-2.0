import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form } from 'antd';

import FileInput from './file/file-input';
import NextStep from './next-step/next-step';
import ToolSelection from './tool-selection/tool-selection';

import './analysis-form.css';

export const AnalysisFormComponent = ({
  form,
  nextStep,
  onSubmit,
  step,
}) => {
  const { getFieldDecorator, getFieldValue } = form;
  return (
    <div className="Form-container">
      <Form>
        <div className="Form-fields">
          <FileInput
            getFieldDecorator={getFieldDecorator}
          />
          <NextStep
            currentStep={step}
            getFieldValue={getFieldValue}
            needed={['file', 'fileType']}
            onClick={nextStep}
            step={0}
          />
          {
            step > 0 &&
            <div>
              <ToolSelection
                getFieldDecorator={getFieldDecorator}
                getFieldValue={getFieldValue}
              />
              <NextStep
                currentStep={step}
                getFieldValue={getFieldValue}
                needed={['analysisType', 'file', 'fileType']}
                onClick={nextStep}
                step={1}
                style={{ marginTop: 10 }}
              />
            </div>
          }
          {
            step > 1 &&
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
          }
        </div>
      </Form>
    </div>
  );
};

AnalysisFormComponent.propTypes = {
  form: PropTypes.shape({}).isRequired,
  nextStep: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

export default Form.create()(AnalysisFormComponent);
