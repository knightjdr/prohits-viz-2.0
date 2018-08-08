import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import PanelSelector from '../../state/selectors/visualization/panel-selector';
import SidePanel from './visualization__side-panel';
import { changePanelTab } from '../../state/set/visualization/display-actions';
import { DisplayPropSelector } from '../../state/selectors/visualization/display-selector';
import { togglePanel } from '../../state/set/visualization/panel-actions';

const SidePanelContainer = ({
  changeTab,
  panel,
  tab,
  toggleSidePanel,
}) => (
  <SidePanel
    isVisible={panel}
    selectTab={changeTab}
    tab={tab}
    togglePanel={toggleSidePanel}
  />
);

SidePanelContainer.propTypes = {
  changeTab: PropTypes.func.isRequired,
  panel: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  toggleSidePanel: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  panel: PanelSelector(state),
  tab: DisplayPropSelector(state, 'tab'),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  changeTab: (tab) => {
    dispatch(changePanelTab(tab));
  },
  toggleSidePanel: () => {
    dispatch(togglePanel());
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidePanelContainer);

export default ConnectedContainer;
