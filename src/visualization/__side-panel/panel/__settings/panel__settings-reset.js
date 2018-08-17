import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faUndo} from '@fortawesome/pro-regular-svg-icons';

const Reset = ({
  resetSettings,
}) => (
  <div className="panel__settings-reset">
    <div>
      Reset:
    </div>
    <button
      className="panel__settings-reset-button"
      onClick={resetSettings}
      type="button"
    >
      <FontAwesomeIcon icon={faUndo} />
    </button>
  </div>
);

Reset.propTypes = {
  resetSettings: PropTypes.func.isRequired,
};

export default Reset;
