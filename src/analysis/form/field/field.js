import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

import CustomCheckbox from './checkbox';
import CustomInput from './input';
import CustomSelect from './select';
import CustomSwitch from './switch';
import CustomTextArea from './text-area';
import CustomUpload from './upload';

/* takes props for an input type and passing it to a custom input that
** wraps it in redux form's <Field> component and Ant design's <FormItem> */

export const WrappedField = ({
  allowClear,
  field,
  formItemLayout,
  helpMessage,
  inputType,
  label,
  multiple,
  onChange,
  options,
  placeHolder,
  rows,
  style,
  type,
}) => {
  const { input, meta } = field;
  switch (type) {
    case 'checkbox':
      return (
        <CustomCheckbox
          formItemLayout={formItemLayout}
          input={input}
          label={label}
          onChange={onChange}
          style={style}
        />
      );
    case 'input':
      return (
        <CustomInput
          helpMessage={helpMessage}
          input={input}
          label={label}
          meta={meta}
          onChange={onChange}
          placeHolder={placeHolder}
          style={style}
          type={inputType}
        />
      );
    case 'select':
      return (
        <CustomSelect
          allowClear={allowClear}
          helpMessage={helpMessage}
          input={input}
          label={label}
          meta={meta}
          multiple={Boolean(multiple)}
          onChange={onChange}
          options={options}
          placeHolder={placeHolder}
          style={style}
        />
      );
    case 'switch':
      return (
        <CustomSwitch
          formItemLayout={formItemLayout}
          helpMessage={helpMessage}
          input={input}
          label={label}
          onChange={onChange}
          style={style}
        />
      );
    case 'textArea':
      return (
        <CustomTextArea
          helpMessage={helpMessage}
          input={input}
          label={label}
          meta={meta}
          onChange={onChange}
          placeHolder={placeHolder}
          rows={rows}
          style={style}
        />
      );
    case 'upload':
      return (
        <CustomUpload
          input={input}
          label={label}
          meta={meta}
          onChange={onChange}
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
