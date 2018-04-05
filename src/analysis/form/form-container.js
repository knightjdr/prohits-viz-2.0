import React, { Component } from 'react';

import AnalysisForm from './analysis-form';

class FormContainer extends Component {
  onSubmit = (values) => {
    console.log(values);
  }
  render() {
    return (
      <AnalysisForm
        onSubmit={this.onSubmit}
      />
    );
  }
}
export default FormContainer;
