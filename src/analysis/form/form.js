import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form } from 'antd';

import FileInput from './file/file-input';
import ToolSelection from './tool-selection/tool-selection';

import './form.css';

export const AnalysisForm = ({
  form,
  onSubmit,
}) => {
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
  return (
    <div className="Form-container">
      <Form>
        <div className="Form-fields">
          <FileInput
            getFieldDecorator={getFieldDecorator}
            setFieldsValue={setFieldsValue}
          />
          <ToolSelection
            getFieldDecorator={getFieldDecorator}
            getFieldValue={getFieldValue}
          />
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
      </Form>
    </div>
  );
};

AnalysisForm.propTypes = {
  form: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form.create()(AnalysisForm);
