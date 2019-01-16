import PropTypes from 'prop-types';
import React, { Component } from 'react';

import defaultScore from './field-funcs/default-secondary-filter';
import SecondaryFilter from './secondary-filter';

class SecondaryFilterContainer extends Component {
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
      this.props.change('secondaryFilter', defaultScore(fileType, score));
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
  fileType: PropTypes.string.isRequired,
  score: PropTypes.string,
};

export default SecondaryFilterContainer;
