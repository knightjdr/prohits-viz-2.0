import PropTypes from 'prop-types';
import React from 'react';
import { faWindow } from '@fortawesome/pro-solid-svg-icons';

import Menu from './menu/menu-container';
import RoundButton from '../../components/round-button/round-button';
import Svg from '../__heatmap/svg/heatmap-svg-container';

import './visualization__tabs.css';

const Tabs = ({
  activeTab,
  handleClick,
  showButton,
  showMenu,
}) => (
  <div className="visualization__tabs">
    {
      showButton &&
      <RoundButton
        className="visualization__tabs-button"
        handleClick={handleClick}
        icon={faWindow}
      />
    }
    { activeTab === 'main' && <Svg /> }
    <Menu
      closeMenu={handleClick}
      show={showMenu}
    />
  </div>
);

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  showButton: PropTypes.bool.isRequired,
  showMenu: PropTypes.bool.isRequired,
};

export default Tabs;
