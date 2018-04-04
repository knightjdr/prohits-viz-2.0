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
    initialValue: input.value || undefined,
    validateTrigger: ['onChange', 'onSubmit'],
    valuePropName: 'value',
  };
  return (
    <FormItem>
      {
        getFieldDecorator(
          name,
          decoratorOptions,
        )(
          <Select
            allowClear
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

CustomSelect.defaultProps = {
  errorMessage: 'Required',
  options: [],
  placeHolder: 'Select',
  required: false,
  style: {},
};

CustomSelect.propTypes = {
  errorMessage: PropTypes.string,
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
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  ),
  placeHolder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.shape({}),
};

export default CustomSelect;
