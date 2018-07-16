import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';
import {
  faBrowser,
  faFileDownload,
} from '@fortawesome/pro-solid-svg-icons';

import './panel__save.css';

const SaveSession = ({
  saveSessionBrowser,
  saveSessionFile,
  saveSessionName,
  sessionName,
}) => (
  <div className="panel__save-session">
    <Input
      onChange={(e) => { saveSessionName(e.target.value); }}
      placeholder="Session name"
      value={sessionName}
    />
    <div className="panel__save-session-grid">
      <div>
        Save to browser
      </div>
      <button
        className="panel__save-button"
        onClick={saveSessionBrowser}
        type="button"
      >
        <FontAwesomeIcon icon={faBrowser} />
      </button>
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
    </div>
  </div>
);

SaveSession.propTypes = {
  saveSessionBrowser: PropTypes.func.isRequired,
  saveSessionFile: PropTypes.func.isRequired,
  saveSessionName: PropTypes.func.isRequired,
  sessionName: PropTypes.string.isRequired,
};

export default SaveSession;
