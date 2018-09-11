import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox } from 'antd';
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
    <div className="analysis-option__details">
      <Checkbox
        checked={removeEmpty}
        onChange={(value) => { handleCheckbox('removeEmpty', value); }}
      >
        Hide empty rows & columns
      </Checkbox>
      <Checkbox
        checked={resetMaximums}
        onChange={(value) => { handleCheckbox('resetMaximums', value); }}
      >
        Reset relative maximums
      </Checkbox>
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
