import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faUndo } from '@fortawesome/pro-solid-svg-icons';

import Button from '../../../../../../../components/button/button';

const Undo = ({
  disabled,
  undo,
}) => (
  <div className="analysis-options__action-button">
    <Button
      className="analysis-options__action-button-inner"
      disabled={disabled}
      onClick={undo}
      type="warning"
    >
      <FontAwesomeIcon icon={faUndo} />
      <span>Undo</span>
    </Button>
  </div>
);

Undo.propTypes = {
  disabled: PropTypes.bool.isRequired,
  undo: PropTypes.func.isRequired,
};

export default Undo;
