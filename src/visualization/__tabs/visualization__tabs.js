import PropTypes from 'prop-types';
import React from 'react';
import { faWindow } from '@fortawesome/pro-solid-svg-icons';

import Customize from './customize/tab-customize';
import Go from './go/go-container';
import Main from './main/tab-main';
import Menu from './menu/menu-container';
import RoundButton from '../../components/round-button/round-button';

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
    { activeTab === 'main' && <Main /> }
    { activeTab === 'customize' && <Customize /> }
    { activeTab === 'go' && <Go /> }
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
