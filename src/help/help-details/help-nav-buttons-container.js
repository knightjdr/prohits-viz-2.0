import React, { Component } from 'react';

import HelpNavButtons from './help-nav-buttons';

class HelpNavButtonsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      length: 3,
    };
  }
  render() {
    return (
      <HelpNavButtons
        index={this.state.index}
        length={this.state.length}
      />
    );
  }
}
export default HelpNavButtonsContainer;
