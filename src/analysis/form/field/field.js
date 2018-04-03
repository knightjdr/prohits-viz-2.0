import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

import CustomCheckbox from './checkbox';
import CustomSelect from './select';
import CustomUpload from './upload';

/* takes props for an input type and passing it to a custom input that
** wraps it in redux form's <Field> component and Ant design's <FormItem> */

const CustomField = ({
  errorMessage,
  getFieldDecorator,
  name,
  onChange,
  options,
  placeHolder,
  required,
  style,
  type,
}) => {
  const componentElement = (field) => {
    const { input } = field;
    switch (type) {
      case 'checkbox':
        return (
          <CustomCheckbox
            errorMessage={errorMessage}
            getFieldDecorator={getFieldDecorator}
            input={input}
            name={name}
            onChange={onChange}
            placeHolder={placeHolder}
            required={required}
            style={style}
          />
        );
      case 'select':
        return (
          <CustomSelect
            errorMessage={errorMessage}
            getFieldDecorator={getFieldDecorator}
            input={input}
            name={name}
            onChange={onChange}
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
            onChange={onChange}
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
  onChange: () => {},
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
  onChange: PropTypes.func,
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
