import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DefaultScore from './field-funcs/default-primary-filter';
import PrimaryFilter from './primary-filter';

class PrimaryFilterContainer extends Component {
  componentWillReceiveProps = (nextProps) => {
    const {
      fileType,
      score,
    } = nextProps;
    this.setReduxFormState(fileType, score);
  }
  setReduxFormState = (fileType, score) => {
    if (
      fileType !== this.props.fileType ||
      score !== this.props.score
    ) {
      this.props.change('primaryFilter', DefaultScore(fileType, score));
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
  fileType: PropTypes.string.isRequired,
  score: PropTypes.string,
};

export default PrimaryFilterContainer;
