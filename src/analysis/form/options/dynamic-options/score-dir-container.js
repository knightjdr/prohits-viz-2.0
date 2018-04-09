import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ScoreDir from './score-dir';

const expectedScoreDir = (score) => {
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

class ScoreDirContainer extends Component {
  constructor(props) {
    super(props);
    const { change, score, scoreDir } = this.props;
    this.setReduxFormState(change, score, scoreDir);
  }
  componentWillReceiveProps = (nextProps) => {
    const { change, score } = nextProps;
    // if score column changes, change scoreDir
    if (score !== this.props.score) {
      change('scoreDir', expectedScoreDir(score));
    }
  }
  setReduxFormState = (change, score, scoreDir) => {
    if (
      !scoreDir &&
      score
    ) {
      change('scoreDir', expectedScoreDir(score));
    }
  }
  render() {
    return (
      <ScoreDir analysisType={this.props.analysisType} />
    );
  }
}

ScoreDirContainer.defaultProps = {
  scoreDir: undefined,
};

ScoreDirContainer.propTypes = {
  analysisType: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  score: PropTypes.string.isRequired,
  scoreDir: PropTypes.string,
};

export default ScoreDirContainer;
