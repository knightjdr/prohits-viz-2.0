import React from 'react';
import { NavLink } from 'react-router-dom';

import CustomField from '../../field/field';
import DefaultCheckboxChange from '../../field/default-checkbox-change';
import Info from '../info/info';

import './output.css';

const Output = () => (
  <div className="form__output">
    <div className="form__output-header">Output</div>
    <p>
      See the{' '}
      <NavLink
        className="form__output-introduction-link"
        to="/help/tools/circ-heatmap"
      >
        help
      </NavLink>{' '}
      for detailed information on the files output from this tool.
    </p>
    <div className="form__output-checkboxes">
      <div className="form__output-checkbox">
        <div className="form__output-checkbox-label">
          Generate PNG:
        </div>
        <CustomField
          helpMessage={Info['circ-heatmap'].png}
          name="png"
          onChange={DefaultCheckboxChange}
          type="switch"
        />
      </div>
    </div>
  </div>
);

export default Output;
