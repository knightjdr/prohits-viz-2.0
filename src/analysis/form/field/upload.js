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
    initialValue: input.value || [],
    rules: [{ required, message: errorMessage }],
    validateTrigger: ['onChange', 'onSubmit'],
  };
  return (
    <FormItem help="">
      {
        getFieldDecorator(
          name,
          decoratorOptions,
        )(
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
          </Upload>,
        )
      }
    </FormItem>
  );
};

CustomUpload.defaultProps = {
  errorMessage: 'Required',
  required: false,
  style: {},
};

CustomUpload.propTypes = {
  errorMessage: PropTypes.string,
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
  required: PropTypes.bool,
  style: PropTypes.shape({}),
};

export default CustomUpload;
