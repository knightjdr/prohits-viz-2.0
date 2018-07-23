import React, { Component } from 'react';

import Go from './options-go';

export class GoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvanced: false,
      form: {
        advanced_options_on: true,
        domain_size_type: 'annotated',
        hierfiltering: '',
        max_set_size: undefined,
        min_isect_size: undefined,
        min_set_size: undefined,
        no_iea: false,
        ordered_query: false,
        organism: 'hsapiens',
        output: 'mini',
        region_query: false,
        sf_CORUM: true,
        sf_GO: true,
        sf_HP: true,
        sf_KEGG: true,
        sf_MI: true,
        sf_REAC: true,
        sf_TF: true,
        'sf_GO:BP': false,
        'sf_GO:CC': true,
        'sf_GO:MF': true,
        significant: true,
        sort_by_structure: true,
        threshold_algo: 'analytical',
        underrep: false,
        user_thr: 1,
      },
    };
  }
  handleCheckbox = (field) => {
    const newState = {};
    newState[field] = !this.state.form[field];
    this.setState(({ form }) => ({
      form: {
        ...form,
        ...newState,
      },
    }));
  }
  handleGoCheckbox = () => {
    this.setState(({ form }) => ({
      form: {
        ...form,
        sf_GO: !form.sf_GO,
        'sf_GO:BP': !form.sf_GO,
        'sf_GO:CC': !form.sf_GO,
        'sf_GO:MF': !form.sf_GO,
      },
    }));
  }
  handleInput = (field, value) => {
    const newState = {};
    newState[field] = value;
    this.setState(({ form }) => ({
      form: {
        ...form,
        ...newState,
      },
    }));
  }
  handleSelect = (field, value) => {
    const newState = {};
    newState[field] = value;
    this.setState(({ form }) => ({
      form: {
        ...form,
        ...newState,
      },
    }));
  }
  toggleAdvanced = () => {
    this.setState(({ showAdvanced }) => ({
      showAdvanced: !showAdvanced,
    }));
  }
  render() {
    return (
      <Go
        form={this.state.form}
        handleCheckbox={this.handleCheckbox}
        handleGoCheckbox={this.handleGoCheckbox}
        handleInput={this.handleInput}
        handleSelect={this.handleSelect}
        showAdvanced={this.state.showAdvanced}
        toggleAdvanced={this.toggleAdvanced}
      />
    );
  }
}

export default GoContainer;
