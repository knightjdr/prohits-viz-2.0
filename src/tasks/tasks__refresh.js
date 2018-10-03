import PropTypes from 'prop-types';
import React from 'react';
import { faSyncAlt } from '@fortawesome/pro-solid-svg-icons';

import RoundButton from '../components/round-button/round-button';

const Refresh = ({
  handleClick,
}) => (
  <RoundButton
    className="tasks__refresh"
    icon={faSyncAlt}
    onClick={handleClick}
    tooltip="Refresh status"
    tooltip-position="left"
  />
);

Refresh.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Refresh;
