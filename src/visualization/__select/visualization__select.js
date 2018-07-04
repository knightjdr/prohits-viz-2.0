import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Upload } from 'antd';
import { NavLink } from 'react-router-dom';
import { faFilePlus } from '@fortawesome/pro-solid-svg-icons';

import './visualization__select.css';

const config = {
  name: 'file',
  multiple: false,
  action: '',
  beforeUpload: () => (false),
};

const Selection = ({
  err,
  handleFile,
}) => (
  <div className="visualization__select">
    <div
      className="visualization__select-error"
      style={{
        transform: err ? 'scaleY(1)' : 'scaleY(0)',
      }}
    >
      {err}
    </div>
    <Upload
      onChange={handleFile}
      {...config}
    >
      <Button>
        <FontAwesomeIcon
          className="FileInput-fa-icon"
          icon={faFilePlus}
        /> Select File
      </Button>
    </Upload>
    <div className="visualization__select-instructions">
      Select the image to display interactively. This file must be JSON format
      (extension .json). If you have downloaded an analysis results folder from
      ProHits-viz these files will be located in the &quot;interactive&quot;
      subfolder. See the {' '}
      <NavLink
        className="decorate-link"
        to="/help/format"
      >
        help
      </NavLink>{' '}
      for information on the input format.
    </div>
  </div>
);

Selection.defaultProps = {
  err: null,
};

Selection.propTypes = {
  err: PropTypes.string,
  handleFile: PropTypes.func.isRequired,
};

export default Selection;
