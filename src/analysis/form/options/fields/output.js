import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import CustomField from '../../field/field';
import DefaultCheckboxChange from '../../field/default-checkbox-change';
import Info from '../info/info';

import './output.css';

const Output = ({
  analysisType,
}) => (
  <div>
    <div className="Output-header">
      Output
    </div>
    <div className="Output-introduction">
      See the{' '}
      <NavLink
        className="Output-introduction-link"
        to="/help/tools/dotplot"
      >
        help
      </NavLink>{' '}
      for detailed information on the files output from this tool.
    </div>
    <div className="Output-checkboxes">
      <div className="Output-checkbox">
        <div className="Output-checkbox-label">
          Generate PDF:
        </div>
        <CustomField
          helpMessage={Info[analysisType].pdf}
          name="pdf"
          onChange={DefaultCheckboxChange}
          type="switch"
        />
      </div>
      <div className="Output-checkbox">
        <div className="Output-checkbox-label">
          Generate PNG:
        </div>
        <CustomField
          helpMessage={Info[analysisType].png}
          name="png"
          onChange={DefaultCheckboxChange}
          type="switch"
        />
      </div>
      <div className="Output-checkbox">
        <div className="Output-checkbox-label">
          Generate distance plots:
        </div>
        <CustomField
          helpMessage={Info[analysisType].writeDistance}
          name="writeDistance"
          onChange={DefaultCheckboxChange}
          type="switch"
        />
      </div>
      <div className="Output-checkbox">
        <div className="Output-checkbox-label">
          Generate heatmap:
        </div>
        <CustomField
          helpMessage={Info[analysisType].writeHeatmap}
          name="writeHeatmap"
          onChange={DefaultCheckboxChange}
          type="switch"
        />
      </div>
    </div>
  </div>
);

Output.propTypes = {
  analysisType: PropTypes.string.isRequired,
};

export default Output;
