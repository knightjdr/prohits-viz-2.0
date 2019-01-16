import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';

import AnalysisFormSelector from '../../../state/selectors/form/analysis-form-selector';
import CircHeatmap from './circ-heatmap-options';
import DotplotOptions from './dotplot-options';
import HeaderSelector from '../../../state/selectors/form/header-selector';

import './options.css';

const options = (type, change, form, header) => {
  switch (type) {
    case 'circ-heatmap':
      return (
        <CircHeatmap
          change={change}
          form={form}
          header={header}
        />
      );
    case 'dotplot':
      return (
        <DotplotOptions
          change={change}
          form={form}
          header={header}
        />
      );
    default:
      return null;
  }
};

export const OptionsComponent = ({
  change,
  form,
  header,
  show,
}) => {
  const optionsElement = (
    <div
      className="form__options"
      style={{
        height: show ? 'auto' : 0,
        opacity: show ? 1 : 0,
        overflow: show ? 'auto' : 'hidden',
      }}
    >
      <Divider>Advanced options</Divider>
      {options(form.analysisType, change, form, header)}
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
