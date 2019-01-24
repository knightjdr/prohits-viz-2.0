import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

import CustomAutoComplete from './auto-complete-container';
import CustomCheckbox from './checkbox';
import CustomInput from './input';
import CustomSelect from './select';
import CustomSwitch from './switch';
import CustomTextArea from './text-area';
import CustomUpload from './upload';

/* takes props for an input type and passing it to a custom input that
** wraps it in redux form's <Field> component and Ant design's <FormItem> */

export const WrappedField = ({
  field,
  type,
  ...otherProps
}) => {
  const { input, meta } = field;
  switch (type) {
    case 'autocomplete':
      return (
        <CustomAutoComplete
          input={input}
          meta={meta}
          {...otherProps}
        />
      );
    case 'checkbox':
      return (
        <CustomCheckbox
          input={input}
          {...otherProps}
        />
      );
    case 'input':
      return (
        <CustomInput
          input={input}
          meta={meta}
          {...otherProps}
        />
      );
    case 'select':
      return (
        <CustomSelect
          input={input}
          meta={meta}
          {...otherProps}
        />
      );
    case 'switch':
      return (
        <CustomSwitch
          input={input}
          {...otherProps}
        />
      );
    case 'textArea':
      return (
        <CustomTextArea
          input={input}
          meta={meta}
          {...otherProps}
        />
      );
    case 'upload':
      return (
        <CustomUpload
          input={input}
          meta={meta}
          {...otherProps}
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
