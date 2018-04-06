import React, { Component } from 'react';

import AnalysisForm from './analysis-form';

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
    };
  }
  onSubmit = (values) => {
    console.log(values);
  }
  handleOptions = () => {
    this.setState(({ showOptions }) => ({
      showOptions: !showOptions,
    }));
  }
  render() {
    return (
      <AnalysisForm
        handleOptions={this.handleOptions}
        onSubmit={this.onSubmit}
        showOptions={this.state.showOptions}
      />
    );
  }
}
export default FormContainer;
