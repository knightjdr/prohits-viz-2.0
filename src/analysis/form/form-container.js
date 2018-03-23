import React, { Component } from 'react';

import StoreForm from './store-form';

class AnalysisFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmit = (e, form) => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    return (
      <StoreForm
        onSubmit={this.onSubmit}
      />
    );
  }
}
export default AnalysisFormContainer;
