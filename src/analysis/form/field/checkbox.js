import PropTypes from 'prop-types';
import React from 'react';
import { Form, Checkbox } from 'antd';

const FormItem = Form.Item;

/* checkbox wrapped in Ant design's <FormItem>, whose initial state will
** be set from the redux store's 'input' */

const CustomCheckbox = ({
  errorMessage,
  getFieldDecorator,
  input,
  name,
  onChange,
  placeHolder, // use for label
  required,
  style,
}) => {
  const decoratorOptions = {
    rules: [{ required, message: errorMessage }],
    checked: input.value || false,
    valuePropName: 'checked',
  };
  return (
    <FormItem>
      {
        getFieldDecorator(
          name,
          decoratorOptions,
        )(
          <Checkbox
            onChange={onChange}
            style={style}
          >
            {placeHolder}
          </Checkbox>,
        )
      }
    </FormItem>
  );
};

CustomCheckbox.defaultProps = {
  errorMessage: '',
  required: false,
  style: {},
};

CustomCheckbox.propTypes = {
  errorMessage: PropTypes.string,
  getFieldDecorator: PropTypes.func.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  }).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  style: PropTypes.shape({}),
};

export default CustomCheckbox;
