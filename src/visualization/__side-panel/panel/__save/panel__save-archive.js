import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faArchive, faExclamationCircle } from '@fortawesome/pro-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import Button from '../../../../components/button/button';

import './panel__save.css';

const Archive = ({
  archive,
}) => (
  <div className="panel__save-archive">
    <div>
      <div>
        Archive
      </div>
      <Button
        className="panel__save-button"
        onClick={archive}
        theme="disabled"
      >
        <FontAwesomeIcon icon={faArchive} />
      </Button>
    </div>
    <div>
      <FontAwesomeIcon icon={faExclamationCircle} />{' '}
      <span>
        Archiving an image will generate a new URL that can be used to access your
        session from any browser. These sessions will be saved for three months.
        If you&apos;d like to have your session permanently archived, please send
        us the URL and we will add it to the whitelist. See the{' '}
        <NavLink
          className="panel__save-link"
          to="/help/visualization/save/archive"
        >
          help
        </NavLink>{' '}
        for details.
      </span>
    </div>
  </div>
);

Archive.propTypes = {
  archive: PropTypes.func.isRequired,
};

export default Archive;
