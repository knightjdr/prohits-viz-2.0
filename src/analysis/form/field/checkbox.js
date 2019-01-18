import PropTypes from 'prop-types';
import React from 'react';
import { Form, Checkbox } from 'antd';

const FormItem = Form.Item;

/* checkbox wrapped in Ant design's <FormItem>, whose state will
** be set from the redux store's 'input' */

const CustomCheckbox = ({
  formItemLayout,
  input,
  label,
  onChange,
  style,
}) => {
  const handleChange = (e) => {
    onChange(e.target.checked, input);
  };
  return (
    <FormItem
      {...formItemLayout}
      label={label}
    >
      <Checkbox
        checked={input.value || false}
        onChange={handleChange}
        style={style}
      />
    </FormItem>
  );
};

CustomCheckbox.defaultProps = {
  formItemLayout: {},
  label: null,
  onChange: null,
  style: {},
};

CustomCheckbox.propTypes = {
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

export default CustomCheckbox;
