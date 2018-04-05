import React, { Component } from 'react';

import StoreForm from './store-form';

class FormContainer extends Component {
  onSubmit = (values) => {
    console.log(values);
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
