import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import {
  faBrowser,
  faFileDownload,
} from '@fortawesome/pro-solid-svg-icons';

import Browser from './session__browser';

import './session.css';

const SaveSession = ({
  changePage,
  deleteSession,
  openSession,
  saveSessionBrowser,
  saveSessionFile,
  saveSessionName,
  sessionItemsTotal,
  sessionName,
  sessions,
  sessionsPage,
  storageSupport,
}) => (
  <div className="session">
    <Input
      onChange={(e) => { saveSessionName(e.target.value); }}
      placeholder="Session name"
      value={sessionName}
    />
    <div className="session__grid">
      <div>
        Save to file
      </div>
      <button
        className="panel__save-button"
        onClick={saveSessionFile}
        type="button"
      >
        <FontAwesomeIcon icon={faFileDownload} />
      </button>
      {
        storageSupport &&
        [
          <div key="browser-storage-label">
            Save to browser
          </div>,
          <button
            className="panel__save-button"
            key="browser-storage-button"
            onClick={saveSessionBrowser}
            type="button"
          >
            <FontAwesomeIcon icon={faBrowser} />
          </button>,
        ]
      }
    </div>
    {
      storageSupport &&
      sessions.length > 0 &&
      <Browser
        changePage={changePage}
        deleteSession={deleteSession}
        openSession={openSession}
        sessionItemsTotal={sessionItemsTotal}
        sessions={sessions}
        sessionsPage={sessionsPage}
      />
    }
  </div>
);

SaveSession.propTypes = {
  changePage: PropTypes.func.isRequired,
  deleteSession: PropTypes.func.isRequired,
  openSession: PropTypes.func.isRequired,
  saveSessionBrowser: PropTypes.func.isRequired,
  saveSessionFile: PropTypes.func.isRequired,
  saveSessionName: PropTypes.func.isRequired,
  sessionItemsTotal: PropTypes.number.isRequired,
  sessionName: PropTypes.string.isRequired,
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  sessionsPage: PropTypes.number.isRequired,
  storageSupport: PropTypes.bool.isRequired,
};

export default SaveSession;
