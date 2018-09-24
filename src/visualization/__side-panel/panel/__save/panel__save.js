import PropTypes from 'prop-types';
import React from 'react';

import Archive from './panel__save-archive';
import BrowserSession from '../../../browser-session/browser-session';
import SaveImage from './panel__save-image';
import SaveSession from './panel__save-session';

import './panel__save.css';

const Save = ({
  archive,
  handleImageType,
  imageType,
  isSaving,
  saveError,
  saveImage,
  saveSessionBrowser,
  saveSessionFile,
  saveSessionName,
  sessionName,
  storageSupport,
}) => (
  <div className="panel">
    <div className="panel__title">
      Save image
    </div>
    <SaveImage
      handleImageType={handleImageType}
      imageType={imageType}
      isSaving={isSaving}
      saveError={saveError}
      saveImage={saveImage}
    />
    <div className="panel__border" />
    <div className="panel__title">
      Save session
    </div>
    <SaveSession
      saveSessionBrowser={saveSessionBrowser}
      saveSessionFile={saveSessionFile}
      saveSessionName={saveSessionName}
      sessionName={sessionName}
      storageSupport={storageSupport}
    />
    <BrowserSession />
    <div className="panel__border" />
    <div className="panel__title">
      Archive session
    </div>
    <Archive
      archive={archive}
    />
  </div>
);

Save.propTypes = {
  archive: PropTypes.func.isRequired,
  handleImageType: PropTypes.func.isRequired,
  imageType: PropTypes.string.isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.bool.isRequired,
  saveImage: PropTypes.func.isRequired,
  saveSessionBrowser: PropTypes.func.isRequired,
  saveSessionFile: PropTypes.func.isRequired,
  saveSessionName: PropTypes.func.isRequired,
  sessionName: PropTypes.string.isRequired,
  storageSupport: PropTypes.bool.isRequired,
};

export default Save;
