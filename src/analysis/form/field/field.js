import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

import CustomCheckbox from './checkbox';
import CustomSelect from './select';
import CustomUpload from './upload';

/* takes props for an input type and passing it to a custom input that
** wraps it in redux form's <Field> component and Ant design's <FormItem> */

export const WrappedField = ({
  errorMessage,
  getFieldDecorator,
  field,
  name,
  onChange,
  options,
  placeHolder,
  required,
  style,
  type,
}) => {
  const { input } = field;
  switch (type) {
    case 'checkbox':
      return (
        <CustomCheckbox
          getFieldDecorator={getFieldDecorator}
          input={input}
          name={name}
          onChange={onChange}
          placeHolder={placeHolder}
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

const CustomField = props => (
  <Field
    component={field => (
      WrappedField({ ...props, field })
    )}
    name={props.name}
  />
);

CustomField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CustomField;
