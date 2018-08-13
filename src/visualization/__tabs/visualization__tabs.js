import PropTypes from 'prop-types';
import React from 'react';
import { faWindow } from '@fortawesome/pro-solid-svg-icons';

import RoundButton from '../../components/round-button/round-button';

import './visualization__tabs.css';

const Tabs = ({
  children,
}) => (
  <div className="visualization__tabs">
    <RoundButton
      className="visualization__tabs-button"
      handleClick={() => {}}
      icon={faWindow}
    />
    { children }
  </div>
);

Tabs.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Tabs;
