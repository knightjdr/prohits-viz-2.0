import React, { Component } from 'react';

import AnalysisOptions from './analysis-options';

class AnalysisOptionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'customize',
    };
  }
  render() {
    return (
      <AnalysisOptions
        type={this.state.type}
      />
    );
  }
}

export default AnalysisOptionsContainer;
