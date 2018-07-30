import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PanelSelector from '../../state/selectors/visualization/panel-selector';
import SidePanel from './visualization__side-panel';
import { togglePanel } from '../../state/set/visualization/panel-actions';

class SidePanelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'info',
    };
  }
  selectTab = (tab) => {
    this.setState({
      tab,
    });
  }
  render() {
    return (
      <SidePanel
        isVisible={this.props.panel}
        selectTab={this.selectTab}
        tab={this.state.tab}
        togglePanel={this.props.togglePanel}
      />
    );
  }
}

SidePanelContainer.propTypes = {
  panel: PropTypes.bool.isRequired,
  togglePanel: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  panel: PanelSelector(state),
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  togglePanel: () => {
    dispatch(togglePanel());
  },
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidePanelContainer);

export default ConnectedContainer;
