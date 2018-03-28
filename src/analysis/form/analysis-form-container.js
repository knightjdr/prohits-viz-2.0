import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AnalysisForm from './analysis-form';

class AnalysisFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }
  nextStep = () => {
    this.setState(({ step }) => ({
      step: step + 1,
    }));
  }
  render() {
    return (
      <AnalysisForm
        nextStep={this.nextStep}
        onSubmit={this.props.onSubmit}
        step={this.state.step}
      />
    );
  }
}

AnalysisFormContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AnalysisFormContainer;
