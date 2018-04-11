import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DefaultScore from './field-funcs/default-primary-filter';
import PrimaryFilter from './primary-filter';

class PrimaryFilterContainer extends Component {
  componentWillReceiveProps = (nextProps) => {
    const {
      analysisType,
      score,
    } = nextProps;
    // if score or analysisType changes, set new default
    this.setReduxFormState(analysisType, score);
  }
  setReduxFormState = (analysisType, score) => {
    if (
      analysisType !== this.props.analysisType ||
      score !== this.props.score
    ) {
      this.props.change('primaryFilter', DefaultScore(analysisType, score));
    }
  }
  render() {
    return (
      <PrimaryFilter analysisType={this.props.analysisType} />
    );
  }
}

PrimaryFilterContainer.defaultProps = {
  score: null,
};

PrimaryFilterContainer.propTypes = {
  analysisType: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  score: PropTypes.string,
};

export default PrimaryFilterContainer;
