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
  <div className="form__file-input">
    <Divider>File selection</Divider>
    <p>
      Specifiy the type of file you would like to analyze and select or drag it
      to the input below. See the {' '}
      <NavLink
        className="form__file-input-link"
        onClick={ScrollTop}
        to="/help/format"
      >
        help
      </NavLink>{' '}
      for information on input formats. Click{' '}
      <button
        className="form__file-input-sample-button"
        onClick={selectSampleFile}
        type="button"
      >
        here
      </button>{' '}
      if you would like to try a sample input file.
    </p>
    <div className="form__file-input-select">
      <div className="form__file-input-select-inner">
        <CustomField
          name="fileType"
          onChange={DefaultChange}
          options={[
            {
              group: true,
              text: 'Protein interaction',
              children: [
                { text: 'SAINT', value: 'saint' },
                { disabled: true, text: 'CRAPome', value: 'crapome' },
                { disabled: true, text: 'Generic', value: 'generic' },
              ],
            },
            {
              group: true,
              text: 'CRISPR',
              children: [
                { disabled: true, text: 'BAGEL', value: 'bagel' },
              ],
            },
          ]}
          placeHolder="File type..."
          type="select"
        />
      </div>
      <div className="form__file-input-upload-wrapper">
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
