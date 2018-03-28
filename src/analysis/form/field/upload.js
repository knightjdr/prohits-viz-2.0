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

export const getFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const FormItem = Form.Item;

/* upload field wrapped in Ant design's <FormItem>, whose initial state will
** be set from the redux store's 'input' */

const CustomUpload = ({
  errorMessage,
  getFieldDecorator,
  input,
  name,
  onChange,
  required,
  style,
}) => {
  const decoratorOptions = {
    getValueFromEvent: getFile,
    valuePropName: 'fileList',
  };
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
          <Upload
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
          </Upload>,
        )
      }
    </FormItem>
  );
};

CustomUpload.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  style: PropTypes.shape({}).isRequired,
};

export default CustomUpload;
