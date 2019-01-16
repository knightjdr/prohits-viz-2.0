import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Divider } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import AnalysisFormSelector from '../../../state/selectors/form/analysis-form-selector';
import CustomField from '../field/field';
import DefaultChange from '../field/default-change';
import ScrollTop from '../../../helpers/scroll-top';

import './tool-selection.css';

const infoMessages = {
  dotplot: (
    <span>
      Quantitative information from condition-readout datasets is visualized as
      a dot plot. This is an ideal way of visualizing and familiarizing yourself with
      small to moderately sized data sets (&#8804; 20 conditions). See the{' '}
      <NavLink
        className="tool-selection__link"
        onClick={ScrollTop}
        to="/help/tools/dotplot"
      >
        help
      </NavLink>{' '}
      for more information on this tool.
    </span>
  ),
  'circ-heatmap': (
    <span>
      Each condition is summarized as a circular heatmap, displaying information about
      the readouts it captured. These images are great for exploring and displaying
      conditions individually. See the{' '}
      <NavLink
        className="tool-selection__link"
        onClick={ScrollTop}
        to="/help/tools/circ-heatmap"
      >
        help
      </NavLink>{' '}
      for more information on this tool.
    </span>
  ),
};

export const ToolSelectionComponent = ({
  form,
}) => {
  const toolElement = (
    <div className="tool-selection">
      <Divider>Analysis tool</Divider>
      <p>
        Select the tool you would like to use for your analysis. A detailed
        description of the tools can be found{' '}
        <NavLink
          className="tool-selection__link"
          onClick={ScrollTop}
          to="/help/tools"
        >
          here
        </NavLink>.
      </p>
      <div className="tool-selection__select">
        <div className="tool-selection__select-inner">
          <CustomField
            name="analysisType"
            onChange={DefaultChange}
            options={[
              { text: 'Circular heatmap', value: 'circ-heatmap' },
              { disabled: true, text: 'Condition v condition', value: 'conditioncondition' },
              { disabled: true, text: 'Correlation', value: 'correlation' },
              { text: 'Dot plot', value: 'dotplot' },
              { disabled: true, text: 'Specificity', value: 'specificity' },
            ]}
            placeHolder="Analysis type..."
            type="select"
          />
        </div>
        {
          form.analysisType &&
          <div className="tool-selection__tool-description">
            <Alert
              message={infoMessages[form.analysisType]}
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

ToolSelectionComponent.propTypes = {
  form: PropTypes.shape({}).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  form: AnalysisFormSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(ToolSelectionComponent);

export default ConnectedContainer;
