import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ScoreType from './score-type';

export const expectedScoreDir = (score) => {
  const scoreMap = {
    avgp: 'gte',
    bfdr: 'lte',
    fca: 'gte',
    fcb: 'gte',
    fdr: 'lte',
    is: 'gte',
    maxp: 'gte',
    saintscore: 'gte',
    sp: 'gte',
    wd: 'gte',
  };
  return scoreMap[score.toLowerCase()] || 'lte';
};

class ScoreTypeContainer extends Component {
  constructor(props) {
    super(props);
    const { change, score, scoreType } = this.props;
    this.setReduxFormState(change, score, scoreType);
  }
  componentWillReceiveProps = (nextProps) => {
    const { change, score } = nextProps;
    // if score column changes, change scoreType
    if (score !== this.props.score) {
      change('scoreType', expectedScoreDir(score));
    }
  }
  setReduxFormState = (change, score, scoreType) => {
    if (
      !scoreType &&
      score
    ) {
      change('scoreType', expectedScoreDir(score));
    }
  }
  render() {
    return (
      <ScoreType analysisType={this.props.analysisType} />
    );
  }
}

ScoreTypeContainer.defaultProps = {
  score: undefined,
  scoreType: undefined,
};

ScoreTypeContainer.propTypes = {
  analysisType: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  score: PropTypes.string,
  scoreType: PropTypes.string,
};

export default ScoreTypeContainer;
