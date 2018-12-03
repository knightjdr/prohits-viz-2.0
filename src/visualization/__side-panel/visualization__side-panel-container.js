import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CanUpdate from '../../components/can-update/can-update';
import panelSelector from '../../state/selectors/visualization/panel-selector';
import SidePanel from './visualization__side-panel';
import { changePanelTab } from '../../state/set/visualization/display-actions';
import { displayPropSelector } from '../../state/selectors/visualization/display-selector';
import { togglePanel } from '../../state/set/visualization/panel-actions';

export class SidePanelContainer extends Component {
  componentDidMount = () => {
    if (window.innerWidth <= process.env.REACT_APP_SMALL_SCREEN) {
      this.props.toggleSidePanel();
    }
  }
  render() {
    return (
      <SidePanel
        animationDuration={this.props.update.animationDuration}
        isVisible={this.props.panel}
        selectTab={this.props.changeTab}
        tab={this.props.tab}
        tabs={this.props.tabs}
        togglePanel={this.props.toggleSidePanel}
        transitionDuration={this.props.update.transitionDuration}
      />
    );
  }
}

SidePanelContainer.propTypes = {
  changeTab: PropTypes.func.isRequired,
  panel: PropTypes.bool.isRequired,
  tab: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleSidePanel: PropTypes.func.isRequired,
  update: PropTypes.shape({
    animationDuration: PropTypes.number,
    transitionDuration: PropTypes.number,
  }).isRequired,
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

export const AsRenderProp = otherProps => (
  <CanUpdate
    afterUpdate={{ animationDuration: 0.3, transitionDuration: 0.5 }}
    beforeUpdate={{ animationDuration: 0, transitionDuration: 0.5 }}
    render={props => <SidePanelContainer {...otherProps} {...props} />}
  />
);

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AsRenderProp);

export default ConnectedContainer;
