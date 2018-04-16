import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMinusSquare from '@fortawesome/fontawesome-pro-solid/faMinusSquare';
import faPlusSquare from '@fortawesome/fontawesome-pro-solid/faPlusSquare';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';
import Errors from './errors';
import Settings from './settings';

import './submit.css';

export const SubmitComponent = ({
  errors,
  form,
  handleOptions,
  showOptions,
}) => {
  const optionsIcon = showOptions ?
    <FontAwesomeIcon icon={faMinusSquare} size="sm" />
    :
    <FontAwesomeIcon icon={faPlusSquare} size="sm" />;
  const headerElement = (
    <div className="Submit-container">
      <div>
        Hit the submit button when ready or customize options.
      </div>
      <div className="Submit-status-container">
        <div className="Submit-analysis-overview">
          <div>
            Current settings:
          </div>
          { Settings(form) }
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
        {Errors(errors)}
      </div>
    </div>
  );
  return (
    headerElement
  );
};

SubmitComponent.propTypes = {
  errors: PropTypes.shape({}).isRequired,
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