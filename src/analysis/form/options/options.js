import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';
import DotplotOptions from './dotplot-options';
import HeaderSelector from '../../../state/selectors/header-selector';

import './options.css';

export const OptionsComponent = ({
  change,
  form,
  header,
  show,
}) => {
  const optionsElement = (
    <div
      className="Options-container"
      style={{
        height: show ? 'auto' : 0,
        opacity: show ? 1 : 0,
        overflow: show ? 'auto' : 'hidden',
      }}
    >
      <Divider>Advanced options</Divider>
      <DotplotOptions
        change={change}
        form={form}
        header={header}
      />
    </div>
  );
  return optionsElement;
};

OptionsComponent.propTypes = {
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
)(OptionsComponent);

export default ConnectedContainer;
