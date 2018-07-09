import PropTypes from 'prop-types';
import React from 'react';

import SaveImage from './panel__save-image';
import SaveSession from './panel__save-session';

import './panel__save.css';

const Save = ({
  imageType,
  sessionName,
}) => (
  <div className="panel">
    <div className="panel__title">
      Save image
    </div>
    <SaveImage
      imageType={imageType}
    />
    <div className="panel__border" />
    <div className="panel__title">
      Save session
    </div>
    <SaveSession
      sessionName={sessionName}
    />
  </div>
);

Save.propTypes = {
  imageType: PropTypes.string.isRequired,
  sessionName: PropTypes.string.isRequired,
};

export default Save;
