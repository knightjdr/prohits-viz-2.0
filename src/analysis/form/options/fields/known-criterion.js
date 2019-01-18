import React from 'react';
import PropTypes from 'prop-types';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

import './option-fields.css';

const KnownCriterion = ({
  dataSource,
  disableSpecies,
}) => (
  <div className="form__option-tf">
    <CustomField
      allowClear
      helpMessage={Info['circ-heatmap'].knownCriterion}
      label="Known criterion"
      name="knownCriterion"
      onChange={DefaultChange}
      options={[
        {
          value: 'interactions',
          text: 'interactions',
        },
      ]}
      placeHolder="Known criteria..."
      type="select"
    />
    <CustomField
      dataSource={dataSource}
      disabled={disableSpecies}
      helpMessage={Info['circ-heatmap'].species}
      label="Species"
      name="species"
      onChange={DefaultChange}
      placeHolder="Species..."
      type="autocomplete"
    />
  </div>
);

KnownCriterion.propTypes = {
  dataSource: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  disableSpecies: PropTypes.bool.isRequired,
};

export default KnownCriterion;
