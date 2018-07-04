import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import {
  faFilter,
  faGlobeAmericas,
  faInfoCircle,
  faPalette,
  faPenSquare,
  faTable,
} from '@fortawesome/pro-light-svg-icons';
import {
  faArrowRight,
  faBars,
} from '@fortawesome/pro-solid-svg-icons';

import Panel from './panel/panel';

import './visualization__side-panel.css';

const showPanel = {
  backdrop: {
    false: {
      backgroundColor: 'rgba(97, 97, 97, 0)',
      pointerEvents: 'none',
    },
    true: {
      backgroundColor: 'rgba(97, 97, 97, 0.5)',
      pointerEvents: 'auto',
    },
  },
  button: {
    false: {
      transform: 'translateX(0)',
    },
    true: {
      transform: 'translateX(-10px)',
    },
  },
  icon: {
    false: faBars,
    true: faArrowRight,
  },
  sidePanel: {
    false: {
      opacity: 0,
      transform: 'translateX(350px)',
    },
    true: {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },
};

const SidePanel = ({
  isVisible,
  selectTab,
  tab,
  togglePanel,
}) => (
  <div className="visualization__side-panel-container">
    <div
      className="visualization__side-panel-backdrop"
      style={showPanel.backdrop[isVisible]}
    />
    <div
      className="visualization__side-panel"
      style={showPanel.sidePanel[isVisible]}
    >
      <div className="visualization__side-panel-tabs">
        <button
          className={tab === 'info' ? 'visualization__side-panel-tab-selected' : null}
          onClick={() => selectTab('info')}
          type="button"
        >
          <FontAwesomeIcon icon={faInfoCircle} size="2x" />
        </button>
        <button
          className={tab === 'map' ? 'visualization__side-panel-tab-selected' : null}
          onClick={() => selectTab('map')}
          type="button"
        >
          <FontAwesomeIcon icon={faGlobeAmericas} size="2x" />
        </button>
        <button
          className={tab === 'palette' ? 'visualization__side-panel-tab-selected' : null}
          onClick={() => selectTab('palette')}
          type="button"
        >
          <FontAwesomeIcon icon={faPalette} size="2x" />
        </button>
        <button
          className={tab === 'filter' ? 'visualization__side-panel-tab-selected' : null}
          onClick={() => selectTab('filter')}
          type="button"
        >
          <FontAwesomeIcon icon={faFilter} size="2x" />
        </button>
        <button
          className={tab === 'annotation' ? 'visualization__side-panel-tab-selected' : null}
          onClick={() => selectTab('annotation')}
          type="button"
        >
          <FontAwesomeIcon icon={faPenSquare} size="2x" />
        </button>
        <button
          className={tab === 'analysis' ? 'visualization__side-panel-tab-selected' : null}
          onClick={() => selectTab('analysis')}
          type="button"
        >
          <FontAwesomeIcon icon={faTable} size="2x" />
        </button>
        <div className="visualization__side-panel-tab-filler" />
      </div>
      {Panel[tab]}
    </div>
    <button
      className="visualization__side-panel-button"
      onClick={togglePanel}
      style={showPanel.button[isVisible]}
      type="button"
    >
      <FontAwesomeIcon icon={showPanel.icon[isVisible]} size="lg" />
    </button>
  </div>
);

SidePanel.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  selectTab: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  togglePanel: PropTypes.func.isRequired,
};

export default SidePanel;
