import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';
import { arrayShallowEqual } from '../../../helpers/array-shallow-equal';
import DefineColumns from './define-columns';
import HeaderSelection from './header-selection';
import HeaderSelector from '../../../state/selectors/header-selector';

export class HeaderSelectionContainer extends Component {
  constructor(props) {
    super(props);
    const { change, form, header } = this.props;
    const { analysisType, fileType } = form;
    const columns = DefineColumns(analysisType, fileType, header);
    this.setInitialReduxFormState(change, form, columns);
    this.state = {
      columns,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    // if tool or header changes, always redefine columns and set state
    const { change, form, header } = nextProps;
    const { analysisType, fileType } = form;
    if (
      analysisType !== this.props.form.analysisType ||
      !arrayShallowEqual(header, this.props.header)
    ) {
      const columns = DefineColumns(analysisType, fileType, header);
      this.setReduxFormState(change, columns);
      this.setState({
        columns,
      });
    }
  }
  setInitialReduxFormState = (change, form, columns) => {
    // on mount set header state. On remount, only set if not already set
    if (
      !form.abundance &&
      columns.abundance.initialValue
    ) {
      change('abundance', columns.abundance.initialValue);
    }
    if (
      !form.bait &&
      columns.bait.initialValue
    ) {
      change('bait', columns.bait.initialValue);
    }
    if (
      !form.prey &&
      columns.prey.initialValue
    ) {
      change('prey', columns.prey.initialValue);
    }
    if (
      !form.score &&
      columns.score.initialValue
    ) {
      change('score', columns.score.initialValue);
    }
  }
  setReduxFormState = (change, columns) => {
    if (columns.abundance.initialValue) {
      change('abundance', columns.abundance.initialValue);
    }
    if (columns.bait.initialValue) {
      change('bait', columns.bait.initialValue);
    }
    if (columns.prey.initialValue) {
      change('prey', columns.prey.initialValue);
    }
    if (columns.score.initialValue) {
      change('score', columns.score.initialValue);
    }
  }
  render() {
    return (
      <HeaderSelection columns={this.state.columns} />
    );
  }
}

HeaderSelectionContainer.defaultProps = {
  header: [],
};

HeaderSelectionContainer.propTypes = {
  change: PropTypes.func.isRequired,
  form: PropTypes.shape({
    analysisType: PropTypes.string,
    fileType: PropTypes.string,
  }).isRequired,
  header: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: AnalysisFormSelector(state),
  header: HeaderSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(HeaderSelectionContainer);

export default ConnectedContainer;
