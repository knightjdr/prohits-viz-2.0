import React from 'react';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';
import speciesList from '../../../../assets/data/interactor-species';

import './option-fields.css';

const Known = () => (
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
      dataSource={speciesList}
      helpMessage={Info['circ-heatmap'].species}
      label="Species"
      name="species"
      onChange={DefaultChange}
      placeHolder="Species..."
      type="autocomplete"
    />
  </div>
);

export default Known;
