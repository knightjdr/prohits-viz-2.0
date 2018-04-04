import React, { Component } from 'react';

import StoreForm from './store-form';

class FormContainer extends Component {
  onSubmit = (e, form) => {
    form.validateFields((errs, values) => {
      if (!errs) {
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
export default FormContainer;
