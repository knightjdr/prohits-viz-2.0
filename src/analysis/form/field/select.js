import PropTypes from 'prop-types';
import React from 'react';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const { OptGroup, Option } = Select;

/* select menu wrapped in Ant design's <FormItem>, whose initial state will
** be set from the redux store's 'input' */

const CustomSelect = ({
  allowClear,
  input,
  label,
  meta,
  onChange,
  options,
  placeHolder,
  required,
  style,
}) => {
  const { error, touched } = meta;
  const formError = required && touched && error;
  return (
    <FormItem
      label={label}
      help={formError ? error : ''}
      validateStatus={formError ? 'error' : ''}
    >
      <Select
        allowClear={allowClear}
        onChange={(value) => { onChange(value, input); }}
        placeholder={placeHolder}
        style={style}
        value={input.value || undefined}
      >
        {
          options.map((option) => {
            // group options if passed group object with children
            if (option.group) {
              return (
                <OptGroup
                  key={option.text}
                  label={option.text}
                >
                  {
                    option.children.map(child => (
                      <Option
                        disabled={child.disabled}
                        key={child.value}
                        value={child.value}
                      >
                        { child.text }
                      </Option>
                    ))
                  }
                </OptGroup>
              );
            }
            // return individual options
            return (
              <Option
                disabled={option.disabled}
                key={option.value}
                value={option.value}
              >
                { option.text }
              </Option>
            );
          })
        }
      </Select>
    </FormItem>
  );
};

CustomSelect.defaultProps = {
  allowClear: false,
  label: null,
  options: [],
  placeHolder: 'Select',
  required: false,
  style: {},
};

CustomSelect.propTypes = {
  allowClear: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
    warning: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(
        PropTypes.shape({}),
      ),
      disabled: PropTypes.bool,
      group: PropTypes.bool,
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
