import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import panelSelector from '../../state/selectors/visualization/panel-selector';
import SidePanel from './visualization__side-panel';
import TransitionHOC from '../transition/transition-hoc';
import { changePanelTab } from '../../state/set/visualization/display-actions';
import { displayPropSelector } from '../../state/selectors/visualization/display-selector';
import { togglePanel } from '../../state/set/visualization/panel-actions';

export const SidePanelContainer = ({
  changeTab,
  panel,
  tab,
  toggleSidePanel,
  transitionDuration,
}) => (
  <SidePanel
    isVisible={panel}
    selectTab={changeTab}
    tab={tab}
    togglePanel={toggleSidePanel}
    transitionDuration={transitionDuration}
  />
);

SidePanelContainer.propTypes = {
  changeTab: PropTypes.func.isRequired,
  panel: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  toggleSidePanel: PropTypes.func.isRequired,
  transitionDuration: PropTypes.string.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  panel: panelSelector(state),
  tab: displayPropSelector(state, 'tab'),
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

export default TransitionHOC(ConnectedContainer);
