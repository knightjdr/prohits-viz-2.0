import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';

import './submit.css';

export const SubmitComponent = ({
  form,
}) => {
  const { abundance, score } = form;
  const headerElement = (
    <div className="Submit-container">
      <div>
        Hit the submit button when ready or customize advanced options. Your
        current analysis will include all preys with a {score} meeting the filter
        of 0.01 and with at least 0 {abundance}.
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
          type="primary"
        >
          Options
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
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: AnalysisFormSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(SubmitComponent);

export default ConnectedContainer;
