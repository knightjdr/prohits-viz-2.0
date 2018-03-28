import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import CustomField from '../field/field';

import './tool-selection.css';

const infoMessages = {
  dotplot: (
    <span>
      This tool takes quantitative information on bait-prey interactions
      and visualizes the interactions as either a dot plot or heat map. This is
      an ideal way of visualizing small to moderately sized data sets (&#8804;
      20 baits). See the <NavLink to="/help/tools/dotplot">help</NavLink> for
      more information on this tool
    </span>
  ),
};

const ToolSelection = ({
  getFieldDecorator,
  getFieldValue,
}) => {
  const toolElement = (
    <div className="ToolSelection-container">
      <Divider>Analysis tool</Divider>
      <div>
        Select the tool you would like to use for your analysis. A detailed
        description of the tools can be found <NavLink to="/help/tools">here</NavLink>.
      </div>
      <div className="ToolSelection-select-container">
        <CustomField
          errorMessage="Please select the analysis type"
          getFieldDecorator={getFieldDecorator}
          name="analysisType"
          options={[
            { disabled: true, text: 'Bait v bait', value: 'baitbait' },
            { disabled: true, text: 'Correlation', value: 'correlation' },
            { text: 'Dot plot', value: 'dotplot' },
            { disabled: true, text: 'Specificity', value: 'specificity' },
          ]}
          placeHolder="Analysis type..."
          required
          style={{
            marginRight: 20,
            width: 150,
          }}
          type="select"
        />
        {
          getFieldValue('analysisType') &&
          <div className="ToolSelection-tool-description">
            <Alert
              message={infoMessages.dotplot}
              showIcon
              type="info"
            />
          </div>
        }
      </div>
    </div>
  );
  return (
    toolElement
  );
};

ToolSelection.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  getFieldValue: PropTypes.func.isRequired,
};

export default ToolSelection;
