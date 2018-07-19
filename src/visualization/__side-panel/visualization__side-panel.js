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
import {
  faArrowRight,
  faBars,
} from '@fortawesome/pro-solid-svg-icons';

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
      transform: 'translateX(0)',
    },
  },
};

const SidePanel = ({
  isVisible,
  selectTab,
  tab,
  togglePanel,
}) => ([
  <div
    className="visualization__side-panel"
    key="side-panel"
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
        className={tab === 'settings' ? 'visualization__side-panel-tab-selected' : null}
        onClick={() => selectTab('settings')}
        type="button"
      >
        <FontAwesomeIcon icon={faCog} size="2x" />
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
      <button
        className={tab === 'save' ? 'visualization__side-panel-tab-selected' : null}
        onClick={() => selectTab('save')}
        type="button"
      >
        <FontAwesomeIcon icon={faSave} size="2x" />
      </button>
      <div className="visualization__side-panel-tab-filler" />
      <button
        className="visualization__side-panel-button-close"
        onClick={togglePanel}
        type="button"
      >
        <FontAwesomeIcon icon={faArrowRight} size="lg" />
      </button>
    </div>
    {Panel[tab]}
  </div>,
  <button
    className="visualization__side-panel-button"
    key="side-panel-button"
    onClick={togglePanel}
    style={showPanel.button[isVisible]}
    type="button"
  >
    <FontAwesomeIcon icon={faBars} size="lg" />
  </button>,
]);

SidePanel.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  selectTab: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  togglePanel: PropTypes.func.isRequired,
};

export default SidePanel;
