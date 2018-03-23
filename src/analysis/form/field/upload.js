import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilePlus from '@fortawesome/fontawesome-pro-solid/faFilePlus';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, Upload } from 'antd';

const config = {
  name: 'file',
  multiple: true,
  action: '',
  beforeUpload: () => (false),
};

const getFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const FormItem = Form.Item;

const CustomUpload = ({
  errorMessage,
  getFieldDecorator,
  input,
  name,
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
          {
            getValueFromEvent: getFile,
            valuePropName: 'fileList',
          },
        )(
          <Upload
            className="ModUpload-container"
            onChange={(value) => {
              // need to set default input.value to []
              // copy input.value to new value
              // push value.fileList to new value
              // input.onChange(newValue);
            }}
            style={style}
            {...config}
          >
            <Button>
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
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  style: PropTypes.shape({}).isRequired,
};

export default CustomUpload;
