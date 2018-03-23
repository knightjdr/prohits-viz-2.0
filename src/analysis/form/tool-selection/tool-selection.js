import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Divider, Select } from 'antd';
import { NavLink } from 'react-router-dom';

import './tool-selection.css';

const { Option } = Select;
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
  getFieldValue,
}) => {
  const toolElement =
    getFieldValue('fileType') &&
    getFieldValue('file') &&
    getFieldValue('file').length > 0 ?
      (
        <div className="ToolSelection-container">
          <Divider>Analysis tool</Divider>
          <div>
            Select the tool you would like to use for your analysis. A detailed
            description of the tools can be found <NavLink to="/help/tools">here</NavLink>.
          </div>
          <div className="ToolSelection-select-container">
            <Select
              className="ToolSelection-select-type"
              placeholder="Tool..."
            >
              <Option value="baitbait" disabled>Bait v bait</Option>
              <Option value="correlation" disabled>Correlation</Option>
              <Option value="dotplot">Dot plot</Option>
              <Option value="specificity" disabled>Specificity</Option>
            </Select>
            <div className="ToolSelection-tool-description">
              <Alert
                message={infoMessages.dotplot}
                showIcon
                type="info"
              />
            </div>
          </div>
        </div>
      )
      :
      null;
  return (
    toolElement
  );
};

ToolSelection.propTypes = {
  getFieldValue: PropTypes.func.isRequired,
};

export default ToolSelection;
