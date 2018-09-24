import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Input } from 'antd';
import {
  faBrowser,
  faFileDownload,
} from '@fortawesome/pro-solid-svg-icons';

import Button from '../../../../components/button/button';

import './panel__save.css';

const SaveSession = ({
  saveSessionBrowser,
  saveSessionFile,
  saveSessionName,
  sessionName,
  storageSupport,
}) => (
  <div className="panel__save-session">
    <Input
      onChange={saveSessionName}
      placeholder="Session name"
      value={sessionName}
    />
    <div className="panel__save-session__grid">
      <div>
        Save to file
      </div>
      <Button
        className="panel__save-button"
        onClick={saveSessionFile}
        type="default"
      >
        <FontAwesomeIcon icon={faFileDownload} />
      </Button>
      {
        storageSupport &&
        <Fragment>
          <div>
            Save to browser
          </div>
          <Button
            className="panel__save-button"
            onClick={saveSessionBrowser}
            type="default"
          >
            <FontAwesomeIcon icon={faBrowser} />
          </Button>
        </Fragment>
      }
    </div>
  </div>
);

SaveSession.propTypes = {
  saveSessionBrowser: PropTypes.func.isRequired,
  saveSessionFile: PropTypes.func.isRequired,
  saveSessionName: PropTypes.func.isRequired,
  sessionName: PropTypes.string.isRequired,
  storageSupport: PropTypes.bool.isRequired,
};

export default SaveSession;
