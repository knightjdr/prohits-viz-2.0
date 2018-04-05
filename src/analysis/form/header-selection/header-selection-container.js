import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';
import DefineColumns from './define-columns';
import HeaderSelection from './header-selection';
import HeaderSelector from '../../../state/selectors/header-selector';

export class HeaderSelectionContainer extends Component {
  constructor(props) {
    super(props);
    const { change, form, header } = this.props;
    const columns = DefineColumns(form.analysisType, form.fileType, header);
    this.setReduxFormState(change, form, columns);
    this.state = {
      columns,
    };
  }
  setReduxFormState = (change, form, columns) => {
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
  form: PropTypes.shape({}).isRequired,
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
