import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import CustomField from '../field/field';

import './file-input.css';

const FileInput = ({
  getFieldDecorator,
}) => (
  <div className="FileInput-container">
    <Divider>File selection</Divider>
    <div>
      Specifiy the type of file you would like to analyze and select or drag it
      to the input below. See the <NavLink to="/help/format">help</NavLink> for
      information on input formats. Click here if you would like to try a sample
      input file.
    </div>
    <div className="FileInput-select-container">
      <CustomField
        errorMessage="Please select the file type"
        getFieldDecorator={getFieldDecorator}
        name="fileType"
        options={[
          { text: 'SAINT', value: 'saint' },
          { disabled: true, text: 'CRAPome', value: 'crapome' },
          { disabled: true, text: 'Generic', value: 'generic' },
        ]}
        placeHolder="File type..."
        required
        style={{ width: 125 }}
        type="select"
      />
      <CustomField
        getFieldDecorator={getFieldDecorator}
        name="file"
        style={{
          marginLeft: 10,
          marginTop: 4,
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
