import PropTypes from 'prop-types';
import React from 'react';
import { Form, Switch } from 'antd';

const FormItem = Form.Item;

/* switch box wrapped in Ant design's <FormItem>, whose state will
** be set from the redux store's 'input' */

const CustomSwitch = ({
  formItemLayout,
  input,
  label,
  onChange,
  style,
}) => (
  <FormItem
    {...formItemLayout}
    label={label}
  >
    <Switch
      checked={input.value || false}
      onChange={(value) => { onChange(value, input); }}
      style={style}
    />
  </FormItem>
);

CustomSwitch.defaultProps = {
  formItemLayout: {},
  label: null,
  onChange: null,
  style: {},
};

CustomSwitch.propTypes = {
  formItemLayout: PropTypes.shape({
    labelCol: PropTypes.shape({}),
    wrapperCol: PropTypes.shape({}),
  }),
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  }).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.shape({}),
};

export default CustomSwitch;
