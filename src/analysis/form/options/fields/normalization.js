import PropTypes from 'prop-types';
import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

import './normalization.css';

const Normalization = ({
  analysisType,
  normalization,
}) => {
  const preyNorm = normalization === 'prey';
  return (
    <div className="Normalization-container">
      <div
        className="Normalization-select"
        style={{
          marginRight: normalization === 'prey' ? 20 : 0,
        }}
      >
        <CustomField
          helpMessage={!preyNorm ? Info[analysisType].normalization : null}
          label="Bait normalization"
          name="normalization"
          onChange={DefaultChange}
          options={[
            { text: 'none', value: 'none' },
            { text: 'Total abundance', value: 'total' },
            { text: 'Specific prey', value: 'prey' },
          ]}
          placeHolder="Bait normalization..."
          type="select"
        />
      </div>
      {
        normalization === 'prey' &&
        <div className="Normalization-input">
          <CustomField
            helpMessage={Info[analysisType].normalization}
            label="Prey for normalization"
            name="normalizationPrey"
            onChange={DefaultChange}
            placeHolder="Prey for normalization..."
            type="input"
          />
        </div>
      }
    </div>
  );
};

Normalization.defaultProps = {
  normalization: null,
};

Normalization.propTypes = {
  analysisType: PropTypes.string.isRequired,
  normalization: PropTypes.string,
};

export default Normalization;
