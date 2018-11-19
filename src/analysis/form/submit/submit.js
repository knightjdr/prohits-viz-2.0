import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import {
  faMinusSquare,
  faPlusSquare,
  faSpinner,
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
  submitPending,
}) => {
  const optionsIcon = showOptions ?
    (
      <FontAwesomeIcon
        className="submit__hide-options-icon"
        icon={faMinusSquare}
        size="sm"
      />
    )
    :
    (
      <FontAwesomeIcon
        className="submit__show-options-icon"
        icon={faPlusSquare}
        size="sm"
      />
    );
  const headerElement = (
    <div className="submit">
      <div>
        Hit the submit button when ready or customize options.
      </div>
      <div className="submit__status">
        <div className="submit__settings">
          <div>
            Current settings:
          </div>
          { Settings(form) }
        </div>
        <div className="submit__buttons">
          <Button
            className="submit__buttons-submit"
            disabled={submitPending}
            htmlType="submit"
            type="submit"
          >
            Submit
          </Button>
          {
            submitPending &&
            <span className="submit_pending">
              <FontAwesomeIcon icon={faSpinner} spin />
              submission pending
            </span>
          }
          <Button
            className="submit__buttons-warning"
            onClick={handleReset}
            tooltip="Reset form"
            tooltip-placement="left"
            type="button"
          >
            Reset
          </Button>
          <Button
            className="submit__buttons-options"
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
  submitPending: PropTypes.bool.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: AnalysisFormSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(SubmitComponent);

export default ConnectedContainer;
