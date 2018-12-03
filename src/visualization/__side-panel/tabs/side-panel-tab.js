import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  faCog,
  faGlobeAmericas,
  faInfoCircle,
  faPenSquare,
  faSave,
  faTable,
} from '@fortawesome/pro-light-svg-icons';

import './side-panel-tabs.css';

const icons = {
  analysis: faTable,
  annotation: faPenSquare,
  info: faInfoCircle,
  map: faGlobeAmericas,
  save: faSave,
  settings: faCog,
};

const SidePanelTab = ({
  onClick,
  selectedTab,
  tab,
}) => {
  const handleClick = () => {
    onClick(tab);
  };
  return (
    <button
      className={selectedTab === tab ? 'side-panel-tab_selected' : null}
      onClick={handleClick}
      type="button"
    >
      <FontAwesomeIcon icon={icons[tab]} size="2x" />
    </button>
  );
};

SidePanelTab.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
};

export default SidePanelTab;
