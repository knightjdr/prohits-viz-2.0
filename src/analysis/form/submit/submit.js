import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMinusSquare from '@fortawesome/fontawesome-pro-solid/faMinusSquare';
import faPlusSquare from '@fortawesome/fontawesome-pro-solid/faPlusSquare';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';

import './submit.css';

const ScoreDirToEntity = scoreDir => (
  scoreDir === 'gte' ? '≥' : '≤'
);

const Settings = (
  analysisType,
  abundance,
  abundanceMin,
  score,
  scoreDir,
  primaryFilter,
) => {
  switch (analysisType) {
    case 'dotplot':
      return ` ${score} ${ScoreDirToEntity(scoreDir)} ${primaryFilter}
        and with at least ${abundanceMin} ${abundance}.`;
    default:
      return '.';
  }
};

export const SubmitComponent = ({
  form,
  handleOptions,
  showOptions,
}) => {
  const {
    abundance,
    abundanceMin,
    analysisType,
    primaryFilter,
    score,
    scoreDir,
  } = form;
  const optionsIcon = showOptions ?
    <FontAwesomeIcon icon={faMinusSquare} size="sm" />
    :
    <FontAwesomeIcon icon={faPlusSquare} size="sm" />;
  const headerElement = (
    <div className="Submit-container">
      <div>
        Hit the submit button when ready or customize options. Your
        analysis will include all preys with a
        {
          Settings(
            analysisType,
            abundance,
            abundanceMin,
            score,
            scoreDir,
            primaryFilter,
          )
        }
      </div>
      <div className="Submit-button-container">
        <Button
          className="success-button"
          htmlType="submit"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className="Submit-options-button"
          onClick={handleOptions}
          type="primary"
        >
          {optionsIcon} Options
        </Button>
      </div>
    </div>
  );
  return (
    headerElement
  );
};

SubmitComponent.propTypes = {
  form: PropTypes.shape({}).isRequired,
  handleOptions: PropTypes.func.isRequired,
  showOptions: PropTypes.bool.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: AnalysisFormSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(SubmitComponent);

export default ConnectedContainer;
