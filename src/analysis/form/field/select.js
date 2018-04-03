import PropTypes from 'prop-types';
import React from 'react';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

/* select menu wrapped in Ant design's <FormItem>, whose initial state will
** be set from the redux store's 'input' */

const CustomSelect = ({
  errorMessage,
  getFieldDecorator,
  input,
  name,
  onChange,
  options,
  placeHolder,
  required,
  style,
}) => {
  const decoratorOptions = {
    rules: [{ required, message: errorMessage }],
  };
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
            onChange={(value) => { onChange(value, input); }}
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
  onChange: PropTypes.func.isRequired,
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
