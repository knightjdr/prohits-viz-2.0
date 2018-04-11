import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnalysisForm from './analysis-form';
import AnalysisFormSelector from '../../state/selectors/analysis-form-selector';

export class FormContainerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        primaryFilter: 0.01,
        secondaryFilter: 0.05,
        minimumAbundance: 0,
        maximumAbundance: 50,
      },
      showOptions: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { form: { analysisType } } = nextProps;
    if (analysisType !== this.props.form.analysisType) {
      console.log(analysisType);
    }
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
        initialValues={this.state.initialValues}
        onSubmit={this.onSubmit}
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
