/* This is a redux form wrapper for the ant design form. It is needed because
**  each has a prop 'form' that would conflict with each other otherwise */
import PropTypes from 'prop-types';
import React from 'react';
import { reduxForm } from 'redux-form';

import AnalysisForm from './analysis-form';

export const storeForm = ({
  change,
  onSubmit,
}) => (
  <AnalysisForm
    change={change}
    onSubmit={onSubmit}
  />
);

storeForm.propTypes = {
  // prop from reduxForm; use to set form programmatically
  change: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const connectedForm = reduxForm({
  destroyOnUnmount: false,
  form: 'analysisForm',
})(storeForm);

export default connectedForm;
