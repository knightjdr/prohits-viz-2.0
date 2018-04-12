import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DefaultScore from './field-funcs/default-secondary-filter';
import SecondaryFilter from './secondary-filter';

class SecondaryFilterContainer extends Component {
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
      this.props.change('secondaryFilter', DefaultScore(analysisType, score));
    }
  }
  render() {
    return (
      <SecondaryFilter analysisType={this.props.analysisType} />
    );
  }
}

SecondaryFilterContainer.defaultProps = {
  score: null,
};

SecondaryFilterContainer.propTypes = {
  analysisType: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  score: PropTypes.string,
};

export default SecondaryFilterContainer;
