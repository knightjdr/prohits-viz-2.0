import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';
import DotplotOptions from './dotplot-options';
import HeaderSelector from '../../../state/selectors/header-selector';

import './options.css';

const Options = ({
  change,
  form,
  header,
  show,
}) => {
  const optionsElement = (
    <div className="Options-container">
      <Divider>Advanced options</Divider>
      <DotplotOptions
        change={change}
        form={form}
        header={header}
      />
    </div>
  );
  return (
    show ? optionsElement : null
  );
};

Options.propTypes = {
  change: PropTypes.func.isRequired,
  form: PropTypes.shape({
    analysisType: PropTypes.string,
  }).isRequired,
  header: PropTypes.arrayOf(
    PropTypes.string,
  ),
  show: PropTypes.bool.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: AnalysisFormSelector(state),
  header: HeaderSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(Options);

export default ConnectedContainer;
