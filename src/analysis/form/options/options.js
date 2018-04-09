import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';

import AnalysisFormSelector from '../../../state/selectors/analysis-form-selector';
import CustomField from '../field/field';
import DefaultChange from '../field/default-change';
import Info from './info/info';
import ScoreDir from './dynamic-options/score-dir-container';

import './options.css';

const Options = ({
  change,
  form,
  show,
}) => {
  const { analysisType, score, scoreDir } = form;
  const optionsElement = (
    <div className="Options-container">
      <Divider>Advanced options</Divider>
      <ScoreDir
        analysisType={analysisType}
        change={change}
        score={score}
        scoreDir={scoreDir}
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
        helpMessage={Info[analysisType].minAbd}
        inputType="number"
        label="Minimum abundance value"
        name="minAbd"
        onChange={DefaultChange}
        placeHolder="Minimum abundance value..."
        required
        type="input"
      />
      <CustomField
        helpMessage={Info[analysisType].maxAbd}
        inputType="number"
        label="Maximum abundance value"
        name="maxAbd"
        onChange={DefaultChange}
        placeHolder="Maximum abundance value..."
        required
        type="input"
      />
      <CustomField
        helpMessage={Info[analysisType].log}
        label="Log transformation"
        name="log"
        onChange={DefaultChange}
        options={[
          { text: 'none', value: 'none' },
          { text: '2', value: 2 },
          { text: 'e', value: 'e' },
          { text: '10', value: 10 },
        ]}
        placeHolder="Log transformation..."
        required
        type="select"
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
      <CustomField
        helpMessage={Info[analysisType].colorScale}
        label="Edge color scale"
        name="edgeColorScale"
        onChange={DefaultChange}
        options={[
          { text: 'Blue to black', value: 'blueBlack' },
          { text: 'Red to black', value: 'redBlack' },
          { text: 'Yellow to black', value: 'yellowBlack' },
          { text: 'Green to black', value: 'greenBlack' },
          { text: 'Greyscale', value: 'greyscale' },
        ]}
        placeHolder="Edge color scale..."
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
  change: PropTypes.func.isRequired,
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
