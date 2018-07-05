import React, { Component } from 'react';

import Settings from './panel__settings';

class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basic: {
        type: 'dotplot',
      },
      palette: {
        edge: 'blueBlack',
        fill: 'blueBlack',
        invert: false,
      },
      filters: {
        abundanceCap: 50,
        minAbundance: 0,
        primary: 0.01,
        secondary: 0.05,
      },
    };
  }
  render() {
    return (
      <Settings
        basic={this.state.basic}
        filters={this.state.filters}
        palette={this.state.palette}
      />
    );
  }
}

export default SettingsContainer;
