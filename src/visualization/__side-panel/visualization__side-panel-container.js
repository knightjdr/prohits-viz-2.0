import React, { Component } from 'react';

import SidePanel from './visualization__side-panel';

class SidePanelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      tab: 'info',
    };
  }
  selectTab = (tab) => {
    this.setState({
      tab,
    });
  }
  togglePanel = () => {
    this.setState(({ isVisible }) => ({
      isVisible: !isVisible,
    }));
  }
  render() {
    return (
      <SidePanel
        isVisible={this.state.isVisible}
        selectTab={this.selectTab}
        tab={this.state.tab}
        togglePanel={this.togglePanel}
      />
    );
  }
}

export default SidePanelContainer;
