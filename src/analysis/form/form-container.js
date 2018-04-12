import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnalysisForm from './analysis-form';
import AnalysisFormSelector from '../../state/selectors/analysis-form-selector';
import InitialValues from './initial-values/initial-values';

export class FormContainerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      initialValues: {},
      showOptions: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { form } = nextProps;
    const { analysisType } = form;
    if (analysisType !== this.props.form.analysisType) {
      this.setState({
        initialValues: { ...form, ...InitialValues(analysisType) },
      });
    }
  }
  onSubmit = (values) => {
    console.log(values);
    this.setState({
      errors: {},
    });
  }
  onSubmitFail = (errors) => {
    this.setState({
      errors,
    });
  }
  handleOptions = () => {
    this.setState(({ showOptions }) => ({
      showOptions: !showOptions,
    }));
  }
  render() {
    return (
      <AnalysisForm
        errors={this.state.errors}
        handleOptions={this.handleOptions}
        initialValues={this.state.initialValues}
        onSubmit={this.onSubmit}
        onSubmitFail={this.onSubmitFail}
        showOptions={this.state.showOptions}
      />
    );
  }
}

FormContainerComponent.propTypes = {
  form: PropTypes.shape({
    analysisType: PropTypes.string,
  }).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: AnalysisFormSelector(state),
});

const ConnectedComponent = connect(
  mapStateToProps,
)(FormContainerComponent);

export default ConnectedComponent;
