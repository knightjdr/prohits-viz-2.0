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
  const readoutNorm = normalization === 'readout';
  return (
    <div className="form__option-normalization">
      <div
        className="form__option-normalization-select"
        style={{
          marginRight: normalization === 'readout' ? 20 : 0,
        }}
      >
        <CustomField
          helpMessage={!readoutNorm ? Info[analysisType].normalization : null}
          label="Condition normalization"
          name="normalization"
          onChange={DefaultChange}
          options={[
            { text: 'none', value: 'none' },
            { text: 'Total abundance', value: 'total' },
            { text: 'Specific readout', value: 'readout' },
          ]}
          placeHolder="Condition normalization..."
          type="select"
        />
      </div>
      {
        normalization === 'readout' &&
        <div className="form__option-normalization-input">
          <CustomField
            helpMessage={Info[analysisType].normalization}
            label="Readout for normalization"
            name="normalizationReadout"
            onChange={DefaultChange}
            placeHolder="Readout for normalization..."
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
