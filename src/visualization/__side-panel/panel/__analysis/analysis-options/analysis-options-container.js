import React, { Component } from 'react';

import AnalysisOptions from './analysis-options';

class AnalysisOptionsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: undefined,
    };
  }
  handleType = (type) => {
    console.log(type);
  }
  render() {
    return (
      <AnalysisOptions
        handleType={this.handleType}
        type={this.state.type}
      />
    );
  }
}

export default AnalysisOptionsContainer;
