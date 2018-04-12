import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import CustomField from '../../field/field';
import DefaultChange from '../../field/default-change';
import Info from '../info/info';

import './output.css';

const Output = ({
  analysisType,
}) => (
  <div>
    <div className="Output-header ant-text">
      Output
    </div>
    <div className="Output-introduction ant-text">
      See the{' '}
      <NavLink
        className="decorate-link"
        to="/help/tools/dotplot"
      >
        help
      </NavLink>{' '}
      for detailed information on the files output from this tool.
    </div>
    <CustomField
      helpMessage={Info[analysisType].outputFolder}
      inputType="text"
      label="Output folder"
      name="outputFolder"
      onChange={DefaultChange}
      placeHolder="Output folder..."
      type="input"
    />
  </div>
);

Output.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default Output;
