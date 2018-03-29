import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import CustomField from '../field/field';
import FileTypeChange from './file-type-change';
import FileUploadChange from './file-upload-change';

import './file-input.css';

const FileInput = ({
  getFieldDecorator,
}) => (
  <div className="FileInput-container">
    <Divider>File selection</Divider>
    <div>
      Specifiy the type of file you would like to analyze and select or drag it
      to the input below. See the
      <NavLink
        className="decorate-link inline-add-margins"
        to="/help/format"
      >
        help
      </NavLink>
      for information on input formats. Click HERE if you would like to try a sample
      input file.
    </div>
    <div className="FileInput-select-container">
      <CustomField
        errorMessage="Please select the file type"
        getFieldDecorator={getFieldDecorator}
        name="fileType"
        onChange={FileTypeChange}
        options={[
          { text: 'SAINT', value: 'saint' },
          { disabled: true, text: 'CRAPome', value: 'crapome' },
          { disabled: true, text: 'Generic', value: 'generic' },
        ]}
        placeHolder="File type..."
        required
        style={{ width: 150 }}
        type="select"
      />
      <CustomField
        getFieldDecorator={getFieldDecorator}
        name="file"
        onChange={FileUploadChange}
        style={{
          marginLeft: 10,
          minWidth: 150,
        }}
        type="upload"
      />
    </div>
  </div>
);

FileInput.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
};

export default FileInput;
