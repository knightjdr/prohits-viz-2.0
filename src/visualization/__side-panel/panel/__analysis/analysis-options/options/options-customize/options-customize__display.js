import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from 'antd';
import { faSyncAlt } from '@fortawesome/pro-solid-svg-icons';

import Button from '../../../../../../../components/button/button';

const Display = ({
  disabled,
  handleCheckbox,
  removeEmpty,
  resetMaximums,
  update,
}) => (
  <div>
    <div className="analysis-option__label">Display options</div>
    <div className="analysis-option__details analysis-option__details-display">
      <div>
        Delete empty rows & columns:
      </div>
      <Switch
        onChange={(value) => { handleCheckbox('removeEmpty', value); }}
        checked={removeEmpty}
      />
      <div>
        Reset row ratios:
      </div>
      <Switch
        onChange={(value) => { handleCheckbox('resetMaximums', value); }}
        checked={resetMaximums}
      />
    </div>
    <div className="analysis-options__action-button">
      <Button
        className="analysis-options__action-button-inner"
        disabled={disabled}
        onClick={update}
      >
        <FontAwesomeIcon icon={faSyncAlt} />
        <span>Update</span>
      </Button>
    </div>
  </div>
);

Display.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  removeEmpty: PropTypes.bool.isRequired,
  resetMaximums: PropTypes.bool.isRequired,
  update: PropTypes.func.isRequired,
};

export default Display;
