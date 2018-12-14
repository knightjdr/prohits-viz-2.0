import PropTypes from 'prop-types';
import React from 'react';
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons';

import RoundButton from '../../../components/round-button/round-button';
import Tab from './side-panel-tab';

import './side-panel-tabs.css';

const SidePanelTabs = ({
  onClick,
  selectedTab,
  tabs,
  togglePanel,
}) => (
  <div className="side-panel-tabs">
    {
      tabs.map(tabOption => (
        <Tab
          key={tabOption}
          onClick={onClick}
          selectedTab={selectedTab}
          tab={tabOption}
        />
      ))
    }
    <div className="side-panel__filler" />
    <RoundButton
      className="side-panel__button-close"
      icon={faArrowRight}
      onClick={togglePanel}
    />
  </div>
);

SidePanelTabs.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  togglePanel: PropTypes.func.isRequired,
};

export default SidePanelTabs;
