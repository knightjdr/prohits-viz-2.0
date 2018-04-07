import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';
import CustomField from '../field/field';
import DefaultChange from '../field/default-change';
import Info from './info/info';

import './options.css';

const Options = ({
  form,
  show,
}) => {
  const { analysisType } = form;
  const optionsElement = (
    <div className="Options-container">
      <Divider>Advanced options</Divider>
      <CustomField
        helpMessage={Info[analysisType].scoreDir}
        label="Score direction"
        name="scoreDir"
        onChange={DefaultChange}
        options={[
          { text: 'smaller values are better', value: 'lte' },
          { text: 'larger values are better', value: 'gte' },
        ]}
        placeHolder="Score direction..."
        required
        type="select"
      />
      <CustomField
        helpMessage={Info[analysisType].primaryFilter}
        inputType="number"
        label="Primary filter"
        name="primaryFilter"
        onChange={DefaultChange}
        placeHolder="Primary filter..."
        required
        type="input"
      />
      <CustomField
        helpMessage={Info[analysisType].secondaryFilter}
        inputType="number"
        label="Secondary filter"
        name="secondaryFilter"
        onChange={DefaultChange}
        placeHolder="Secondary filter..."
        required
        type="input"
      />
      <CustomField
        helpMessage={Info[analysisType].colorScale}
        label="Fill color scale"
        name="fillColorScale"
        onChange={DefaultChange}
        options={[
          { text: 'Blue to black', value: 'blueBlack' },
          { text: 'Red to black', value: 'redBlack' },
          { text: 'Yellow to black', value: 'yellowBlack' },
          { text: 'Green to black', value: 'greenBlack' },
          { text: 'Greyscale', value: 'greyscale' },
        ]}
        placeHolder="Fill color scale..."
        required
        type="select"
      />
    </div>
  );
  return (
    show ? optionsElement : null
  );
};

Options.propTypes = {
  form: PropTypes.shape({
    analysisType: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: AnalysisFormSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(Options);

export default ConnectedContainer;
