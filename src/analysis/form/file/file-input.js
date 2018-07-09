import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import CustomField from '../field/field';
import DefaultChange from '../field/default-change';
import ScrollTop from '../../../helpers/scroll-top';

import './file-input.css';

const FileInput = ({
  onFileChange,
  selectSampleFile,
}) => (
  <div className="FileInput-container">
    <Divider>File selection</Divider>
    <div>
      Specifiy the type of file you would like to analyze and select or drag it
      to the input below. See the {' '}
      <NavLink
        className="FileInput-link"
        onClick={ScrollTop}
        to="/help/format"
      >
        help
      </NavLink>{' '}
      for information on input formats. Click{' '}
      <button
        className="FileInput-sample-button"
        onClick={selectSampleFile}
        type="button"
      >
        here
      </button>{' '}
      if you would like to try a sample input file.
    </div>
    <div className="FileInput-select-container">
      <div className="FileInput-select">
        <CustomField
          name="fileType"
          onChange={DefaultChange}
          options={[
            { text: 'SAINT', value: 'saint' },
            { disabled: true, text: 'CRAPome', value: 'crapome' },
            { disabled: true, text: 'Generic', value: 'generic' },
          ]}
          placeHolder="File type..."
          type="select"
        />
      </div>
      <div className="FileInput-upload-wrapper">
        <CustomField
          name="file"
          onChange={onFileChange}
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
