import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import {
  faMinusSquare,
  faPlusSquare,
} from '@fortawesome/pro-solid-svg-icons';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';
import Errors from './errors';
import Settings from './settings';

import './submit.css';

export const SubmitComponent = ({
  errors,
  form,
  handleOptions,
  handleReset,
  showOptions,
}) => {
  const optionsIcon = showOptions ?
    (
      <FontAwesomeIcon
        className="Submit-hide-options-icon"
        icon={faMinusSquare}
        size="sm"
      />
    )
    :
    (
      <FontAwesomeIcon
        className="Submit-show-options-icon"
        icon={faPlusSquare}
        size="sm"
      />
    );
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
            className="submit__buttons-submit"
            htmlType="submit"
            type="submit"
          >
            Submit
          </Button>
          <Tooltip
            placement="left"
            title="Reset options"
          >
            <Button
              className="submit__buttons-warning"
              onClick={handleReset}
              type="button"
            >
              Reset
            </Button>
          </Tooltip>
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
  handleReset: PropTypes.func.isRequired,
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
