import PropTypes from 'prop-types';
import React from 'react';
import { faUndo } from '@fortawesome/pro-regular-svg-icons';

import RoundButton from '../../../../components/round-button/round-button';

const Reset = ({
  resetSettings,
}) => (
  <div className="panel__settings-reset">
    <div>
      Reset:
    </div>
    <RoundButton
      className="panel__settings-reset-button"
      onClick={resetSettings}
      icon={faUndo}
      size="1x"
      type="warning"
    />
  </div>
);

Reset.propTypes = {
  resetSettings: PropTypes.func.isRequired,
};

export default Reset;
