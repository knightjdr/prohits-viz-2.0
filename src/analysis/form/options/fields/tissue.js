import React from 'react';
import PropTypes from 'prop-types';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import DefaultCheckboxChange from '../../field/default-checkbox-change';
import Info from '../info/info';
import tissues from '../../../../assets/data/expression-tissues';

import './option-fields.css';

const options = [
  {
    children: tissues.cells.map(cell => ({
      text: cell,
      value: cell,
    })),
    group: true,
    text: 'Cells',
  },
  {
    children: tissues.tissues.map(tissue => ({
      text: tissue,
      value: tissue,
    })),
    group: true,
    text: 'Tissues',
  },
];

const Tissue = ({
  disableTissues,
}) => (
  <div className="form__option-cs">
    <div className="form__option-cs-checkbox">
      <div className="form__option-cs-checkbox-label">
        Show tissue expression:
      </div>
      <CustomField
        name="tissueExpression"
        onChange={DefaultCheckboxChange}
        type="switch"
      />
    </div>
    <div className="form__option-cs-select">
      <CustomField
        disabled={disableTissues}
        helpMessage={Info['circ-heatmap'].tissues}
        label="Tissues"
        multiple
        name="tissues"
        onChange={DefaultChange}
        options={options}
        placeHolder="Tissues..."
        type="select"
      />
    </div>
  </div>
);

Tissue.propTypes = {
  disableTissues: PropTypes.bool.isRequired,
};

export default Tissue;
