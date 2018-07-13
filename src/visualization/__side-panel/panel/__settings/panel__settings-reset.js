import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  faCog,
  faImage,
} from '@fortawesome/pro-regular-svg-icons';

const Reset = ({
  resetSettings,
}) => (
  <div className="panel__settings-reset">
    <div>
      Settings
    </div>
    <button
      className="panel__settings-reset-button"
      onClick={resetSettings}
      type="button"
    >
      <FontAwesomeIcon icon={faCog} />
    </button>
    <div>
      Image
    </div>
    <button
      className="panel__settings-reset-button"
      type="button"
    >
      <FontAwesomeIcon icon={faImage} />
    </button>
  </div>
);

Reset.propTypes = {
  resetSettings: PropTypes.func.isRequired,
};

export default Reset;
