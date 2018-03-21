import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilePlus from '@fortawesome/fontawesome-pro-solid/faFilePlus';
import React from 'react';
import { Icon, Upload } from 'antd';
import { NavLink } from 'react-router-dom';

import './file-input.css';

const { Dragger } = Upload;

const config = {
  name: 'file',
  multiple: true,
  action: '',
  beforeUpload: () => (false),
};

const FileInput = () => (
  <div className="FileInput-container">
    <Dragger
      className="FileInput-dragger"
      {...config}
    >
      <p className="ant-upload-drag-icon">
        <Icon>
          <FontAwesomeIcon icon={faFilePlus} size="sm" />
        </Icon>
      </p>
      <p className="ant-upload-text">
        Click to select a file or files from your filesystem or drag the file(s)
        you would like to analyze to this area. See the
        <NavLink
          className="FileInput-drag-help"
          to="/help/format"
        >
          Help
        </NavLink>
        for information on acceptable input formats.
      </p>
    </Dragger>
  </div>
);

export default FileInput;
