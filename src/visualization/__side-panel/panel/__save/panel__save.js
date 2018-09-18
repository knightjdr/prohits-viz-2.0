import PropTypes from 'prop-types';
import React from 'react';

import Archive from './panel__save-archive';
import SaveImage from './panel__save-image';
import SaveSession from './session/session';

import './panel__save.css';

const Save = ({
  archive,
  changePage,
  deleteSession,
  handleImageType,
  imageType,
  isSaving,
  openSession,
  saveError,
  saveImage,
  saveSessionBrowser,
  saveSessionFile,
  saveSessionName,
  sessionItemsTotal,
  sessionName,
  sessions,
  sessionsPage,
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
      changePage={changePage}
      deleteSession={deleteSession}
      openSession={openSession}
      saveSessionBrowser={saveSessionBrowser}
      saveSessionFile={saveSessionFile}
      saveSessionName={saveSessionName}
      sessionItemsTotal={sessionItemsTotal}
      sessionName={sessionName}
      sessions={sessions}
      sessionsPage={sessionsPage}
      storageSupport={storageSupport}
    />
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
  changePage: PropTypes.func.isRequired,
  deleteSession: PropTypes.func.isRequired,
  handleImageType: PropTypes.func.isRequired,
  imageType: PropTypes.string.isRequired,
  isSaving: PropTypes.bool.isRequired,
  openSession: PropTypes.func.isRequired,
  saveError: PropTypes.bool.isRequired,
  saveImage: PropTypes.func.isRequired,
  saveSessionBrowser: PropTypes.func.isRequired,
  saveSessionFile: PropTypes.func.isRequired,
  saveSessionName: PropTypes.func.isRequired,
  sessionItemsTotal: PropTypes.number.isRequired,
  sessionName: PropTypes.string.isRequired,
  sessions: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  sessionsPage: PropTypes.number.isRequired,
  storageSupport: PropTypes.bool.isRequired,
};

export default Save;
