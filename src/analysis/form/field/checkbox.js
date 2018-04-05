import PropTypes from 'prop-types';
import React from 'react';
import { Form, Checkbox } from 'antd';

const FormItem = Form.Item;

/* checkbox wrapped in Ant design's <FormItem>, whose state will
** be set from the redux store's 'input' */

const CustomCheckbox = ({
  input,
  label,
  onChange,
  style,
}) => (
  <FormItem label={label}>
    <Checkbox
      checked={input.value || false}
      onChange={onChange}
      style={style}
    />
  </FormItem>
);

CustomCheckbox.defaultProps = {
  label: null,
  style: {},
};

CustomCheckbox.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  }).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
};

export default CustomCheckbox;
