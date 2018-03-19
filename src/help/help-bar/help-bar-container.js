import React, { Component } from 'react';

import HelpBar from './help-bar';

import './help-bar.css';

const smallScreenSize = 680;

class HelpBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelVisible: false,
      isSmallScreen: this.smallScreen(),
    };
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.onResize);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize);
  }
  onResize = () => {
    this.setState({
      isPanelVisible: false,
      isSmallScreen: this.smallScreen(),
    });
  }
  smallScreen = () => {
    const isSmall = window.innerWidth <= smallScreenSize;
    return isSmall;
  }
  showPanel = () => {
    this.setState(({ isPanelVisible }) => ({
      isPanelVisible: !isPanelVisible,
    }));
  }
  render() {
    return (
      <HelpBar
        isPanelVisible={this.state.isPanelVisible}
        isSmallScreen={this.state.isSmallScreen}
        showPanel={this.showPanel}
      />
    );
  }
}

export default HelpBarContainer;
