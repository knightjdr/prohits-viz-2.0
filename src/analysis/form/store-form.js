import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'antd';
import { reduxForm } from 'redux-form';

import FileInput from './file/file-input-container';

import './analysis-form.css';

export const storeForm = ({
  change,
  handleSubmit,
}) => (
  <div className="Form-container">
    <Form onSubmit={handleSubmit}>
      <div className="Form-fields">
        <FileInput
          change={change}
        />
      </div>
    </Form>
  </div>
);

storeForm.propTypes = {
  // prop from reduxForm; use to set form programmatically
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const connectedForm = reduxForm({
  destroyOnUnmount: false,
  form: 'analysisForm',
})(storeForm);

export default connectedForm;
