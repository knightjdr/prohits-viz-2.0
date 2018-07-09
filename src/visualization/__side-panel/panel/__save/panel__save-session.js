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
  sessionName,
}) => (
  <div className="panel__save-session">
    <Input
      placeholder="Session name"
    />
    <div className="panel__save-session-grid">
      <div>
        Save to browser
      </div>
      <button
        className="panel__save-button"
        type="button"
      >
        <FontAwesomeIcon icon={faBrowser} />
      </button>
      <div>
        Save to file
      </div>
      <button
        className="panel__save-button"
        type="button"
      >
        <FontAwesomeIcon icon={faFileDownload} />
      </button>
    </div>
  </div>
);

SaveSession.propTypes = {
  sessionName: PropTypes.string.isRequired,
};

export default SaveSession;
