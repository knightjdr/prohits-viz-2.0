import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import panelSelector from '../../state/selectors/visualization/panel-selector';
import SidePanel from './visualization__side-panel';
import { changePanelTab } from '../../state/set/visualization/display-actions';
import { displayPropSelector } from '../../state/selectors/visualization/display-selector';
import { togglePanel } from '../../state/set/visualization/panel-actions';

export class SidePanelContainer extends PureComponent {
  componentDidMount = () => {
    if (window.innerWidth <= process.env.REACT_APP_SMALL_SCREEN) {
      this.props.toggleSidePanel();
    }
  }
  render() {
    return (
      <SidePanel
        isVisible={this.props.panel}
        selectTab={this.props.changeTab}
        tab={this.props.tab}
        togglePanel={this.props.toggleSidePanel}
      />
    );
  }
}

SidePanelContainer.propTypes = {
  changeTab: PropTypes.func.isRequired,
  panel: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  toggleSidePanel: PropTypes.func.isRequired,
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

export default ConnectedContainer;
