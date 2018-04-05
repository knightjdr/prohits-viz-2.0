import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

import CustomCheckbox from './checkbox';
import CustomSelect from './select';
import CustomUpload from './upload';

/* takes props for an input type and passing it to a custom input that
** wraps it in redux form's <Field> component and Ant design's <FormItem> */

export const WrappedField = ({
  allowClear,
  field,
  label,
  onChange,
  options,
  placeHolder,
  required,
  style,
  type,
}) => {
  const { input, meta } = field;
  switch (type) {
    case 'checkbox':
      return (
        <CustomCheckbox
          input={input}
          label={label}
          onChange={onChange}
          style={style}
        />
      );
    case 'select':
      return (
        <CustomSelect
          allowClear={allowClear}
          label={label}
          input={input}
          meta={meta}
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
          label={label}
          input={input}
          meta={meta}
          onChange={onChange}
          required={required}
          style={style}
        />
      );
    default:
      return null;
  }
};

/* wrap field component with redux Field. Adds input and meta props.
** input has 'change' and 'value' keys. 'change' is a method for setting
** the redux value programatically via an onChange handler of the form
** field, while 'value' has the current redux form field value. The 'meta'
** object has 'error', 'touched' and 'warning' keys for form interactions */
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
