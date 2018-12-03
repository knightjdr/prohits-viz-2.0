import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { faBars } from '@fortawesome/pro-solid-svg-icons';

import RoundButton from '../../components/round-button/round-button';
import Tabs from './tabs/side-panel-tabs';
import Panel from './panel/panel';

import './visualization__side-panel.css';

const showPanel = {
  button: {
    false: {
      opacity: 1,
    },
    true: {
      opacity: 0,
    },
  },
  sidePanel: {
    false: {
      opacity: 0,
      transform: 'translateX(350px)',
    },
    true: {
      opacity: 1,
      transform: 'translateX(-10px)',
    },
  },
};

const SidePanel = ({
  animationDuration,
  isVisible,
  selectTab,
  tab,
  tabs,
  togglePanel,
  transitionDuration,
}) => (
  <Fragment>
    <div
      className="visualization__side-panel"
      style={{
        ...showPanel.sidePanel[isVisible],
        animationDuration: `${animationDuration}s`,
        transitionDuration: `${transitionDuration}s`,
      }}
    >
      <Tabs
        onClick={selectTab}
        selectedTab={tab}
        tabs={tabs}
        togglePanel={togglePanel}
      />
      {Panel[tab]}
    </div>
    <RoundButton
      className="visualization__side-panel-button"
      icon={faBars}
      onClick={togglePanel}
      style={showPanel.button[isVisible]}
      type="button"
    />
  </Fragment>
);

SidePanel.propTypes = {
  animationDuration: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  selectTab: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  togglePanel: PropTypes.func.isRequired,
  transitionDuration: PropTypes.number.isRequired,
};

export default SidePanel;
