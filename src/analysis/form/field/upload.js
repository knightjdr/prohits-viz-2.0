import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilePlus from '@fortawesome/fontawesome-pro-solid/faFilePlus';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, Upload } from 'antd';

import './upload.css';

const config = {
  name: 'file',
  multiple: true,
  action: '',
  beforeUpload: () => (false),
};
const FormItem = Form.Item;

/* upload field wrapped in Ant design's <FormItem>, whose initial state will
** be set from the redux store's 'input' */

const CustomUpload = ({
  input,
  label,
  meta,
  onChange,
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
      <Upload
        fileList={input.value || []}
        onChange={(value) => { onChange(value, input); }}
        {...config}
      >
        <Button
          style={style}
        >
          <FontAwesomeIcon
            className="FileInput-fa-icon"
            icon={faFilePlus}
          /> Select File
        </Button>
      </Upload>
    </FormItem>
  );
};

CustomUpload.defaultProps = {
  label: null,
  required: false,
  style: {},
};

CustomUpload.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.array,
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
  required: PropTypes.bool,
  style: PropTypes.shape({}),
};

export default CustomUpload;
