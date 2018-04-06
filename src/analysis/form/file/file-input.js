import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import CustomField from '../field/field';
import DefaultChange from '../field/default-change';

import './file-input.css';

const FileInput = ({
  onFileChange,
  selectSampleFile,
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
      for information on input formats. Click
      <button
        className="nobutton FileInput-sample-button"
        onClick={selectSampleFile}
        type="button"
      >
        here
      </button>
      if you would like to try a sample input file.
    </div>
    <div className="FileInput-select-container">
      <CustomField
        name="fileType"
        onChange={DefaultChange}
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
      <div className="FileInput-upload-wrapper">
        <CustomField
          name="file"
          onChange={onFileChange}
          required
          style={{
            minWidth: 150,
          }}
          type="upload"
        />
      </div>
      <CustomField
        name="sampleFile"
        style={{
          display: 'none',
        }}
        type="checkbox"
      />
    </div>
  </div>
);

FileInput.propTypes = {
  onFileChange: PropTypes.func.isRequired,
  selectSampleFile: PropTypes.func.isRequired,
};

export default FileInput;
