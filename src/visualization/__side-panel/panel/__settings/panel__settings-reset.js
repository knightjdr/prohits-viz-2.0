import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  faCog,
  faImage,
} from '@fortawesome/pro-regular-svg-icons';

const Reset = ({
  resetImage,
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
      onClick={resetImage}
      type="button"
    >
      <FontAwesomeIcon icon={faImage} />
    </button>
  </div>
);

Reset.propTypes = {
  resetImage: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
};

export default Reset;
