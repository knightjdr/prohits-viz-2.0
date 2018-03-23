import PropTypes from 'prop-types';
import React from 'react';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

const CustomSelect = ({
  errorMessage,
  getFieldDecorator,
  input,
  name,
  options,
  placeHolder,
  required,
  style,
}) => {
  const decoratorOptions = {};
  if (required) {
    decoratorOptions.rules = [{ required: true, message: errorMessage }];
  }
  if (input.value) {
    decoratorOptions.initialValue = input.value;
  }
  return (
    <FormItem>
      {
        getFieldDecorator(
          name,
          decoratorOptions,
        )(
          <Select
            onChange={(value) => { input.onChange(value); }}
            placeholder={placeHolder}
            style={style}
          >
            { options.map(option => (
              <Option
                disabled={option.disabled}
                key={option.value}
                value={option.value}
              >
                { option.text }
              </Option>
            ))}
          </Select>,
        )
      }
    </FormItem>
  );
};

CustomSelect.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  placeHolder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  style: PropTypes.shape({}).isRequired,
};

export default CustomSelect;
