import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

import CustomSelect from './select';
import CustomUpload from './upload';

const CustomField = ({
  errorMessage,
  getFieldDecorator,
  name,
  options,
  placeHolder,
  required,
  style,
  type,
}) => {
  const componentElement = (field) => {
    const { input } = field;
    switch (type) {
      case 'select':
        return (
          <CustomSelect
            errorMessage={errorMessage}
            getFieldDecorator={getFieldDecorator}
            input={input}
            name={name}
            options={options}
            placeHolder={placeHolder}
            required={required}
            style={style}
          />
        );
      case 'upload':
        return (
          <CustomUpload
            errorMessage={errorMessage}
            getFieldDecorator={getFieldDecorator}
            input={input}
            name={name}
            required={required}
            style={style}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Field
      name={name}
      component={componentElement}
    />
  );
};

CustomField.defaultProps = {
  errorMessage: 'Required',
  options: [],
  placeHolder: 'Input',
  required: false,
  style: {},
  type: 'input',
};

CustomField.propTypes = {
  errorMessage: PropTypes.string,
  getFieldDecorator: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  placeHolder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.shape({}),
  type: PropTypes.string,
};

export default CustomField;
