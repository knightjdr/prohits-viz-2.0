import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnalysisForm from './analysis-form';
import analysisFormSelector from '../../state/selectors/analysis-form-selector';
import convertToForm from './submission/convert-to-form';
import formSubmit from './submission/form-submit';
import InitialValues from './initial-values/initial-values';
import sessionSelector from '../../state/selectors/session-selector';
import { clearFormStep } from '../../state/set/form-step-actions';

export class FormContainerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analysisError: false,
      errors: {},
      initialValues: this.props.form,
      showOptions: false,
      taskID: null,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    const { form } = this.props;
    this.updateType(nextProps, form.analysisType);
  }
  onSubmit = (obj) => {
    const form = convertToForm(obj);
    const type = obj.analysisType;
    formSubmit(form, this.props.session, type)
      .then((id) => {
        this.setState({
          taskID: id,
          errors: {},
        });
      })
      .catch(() => {
        this.setState({
          analysisError: true,
        });
      });
  }
  onSubmitFail = (errors) => {
    this.setState({
      errors,
    });
  }
  closeError = () => {
    this.setState({
      analysisError: false,
    });
  }
  closeStatus = () => {
    this.setState({
      taskID: null,
    });
  }
  handleOptions = () => {
    this.setState(({ showOptions }) => ({
      showOptions: !showOptions,
    }));
  }
  handleReset = () => {
    const { analysisType } = this.props.form;
    if (analysisType) {
      this.props.clearStep();
      this.setState({
        initialValues: { ...InitialValues(analysisType) },
      });
    }
  }
  updateType = (
    { form },
    prevAnalysisType,
  ) => {
    if (form.analysisType !== prevAnalysisType) {
      this.setState({
        initialValues: { ...form, ...InitialValues(form.analysisType) },
      });
    }
  }
  render() {
    return (
      <AnalysisForm
        analysisError={this.state.analysisError}
        closeError={this.closeError}
        closeStatus={this.closeStatus}
        errors={this.state.errors}
        handleOptions={this.handleOptions}
        initialValues={this.state.initialValues}
        onSubmit={this.onSubmit}
        onSubmitFail={this.onSubmitFail}
        handleReset={this.handleReset}
        showOptions={this.state.showOptions}
        taskID={this.state.taskID}
      />
    );
  }
}

FormContainerComponent.defaultProps = {
  session: null,
};

FormContainerComponent.propTypes = {
  clearStep: PropTypes.func.isRequired,
  form: PropTypes.shape({
    analysisType: PropTypes.string,
  }).isRequired,
  session: PropTypes.string,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearStep: () => {
    dispatch(clearFormStep());
  },
});

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: analysisFormSelector(state),
  session: sessionSelector(state),
});

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormContainerComponent);

export default ConnectedComponent;
