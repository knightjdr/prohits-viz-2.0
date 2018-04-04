import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import CustomField from '../field/field';
import HeaderSelector from '../../../state/selectors/header-selector';
import SelectChange from '../field/select-change';

import './header-selection.css';

export const HeaderSelectionComponent = ({
  getFieldDecorator,
}) => {
  const headerElement = (
    <div className="HeaderSelection-container">
      <Divider>Columns</Divider>
      <div>
        Specify the columns to use in your anaylsis if they have not been
        preselected. See
        <NavLink
          className="decorate-link inline-add-margins"
          to="/help/tools"
        >
          here
        </NavLink>
        to learn about how the columns are used in your analysis.
      </div>
      <div className="HeaderSelection-select-container">
        <CustomField
          errorMessage="Please select the bait column"
          getFieldDecorator={getFieldDecorator}
          name="bait"
          onChange={SelectChange}
          options={[
            { text: 'Bait', value: 'Bait' },
          ]}
          placeHolder="Bait..."
          required
          style={{
            gridColumn: 1,
            gridRow: 1,
          }}
          type="select"
        />
        <CustomField
          errorMessage="Please select the prey column"
          getFieldDecorator={getFieldDecorator}
          name="prey"
          onChange={SelectChange}
          options={[
            { text: 'Prey', value: 'prey' },
          ]}
          placeHolder="Prey..."
          required
          style={{
            gridColumn: 2,
            gridRow: 1,
          }}
          type="select"
        />
        <CustomField
          errorMessage="Please select the abundance column"
          getFieldDecorator={getFieldDecorator}
          name="abundance"
          onChange={SelectChange}
          options={[
            { text: 'AvgSpec', value: 'AvgSpec' },
          ]}
          placeHolder="Abundance..."
          required
          style={{
            gridColumn: 1,
            gridRow: 2,
          }}
          type="select"
        />
        <CustomField
          errorMessage="Please select the score column"
          getFieldDecorator={getFieldDecorator}
          name="score"
          onChange={SelectChange}
          options={[
            { text: 'BFDR', value: 'BFDR' },
          ]}
          placeHolder="Score..."
          required
          style={{
            gridColumn: 2,
            gridRow: 2,
          }}
          type="select"
        />
      </div>
    </div>
  );
  return (
    headerElement
  );
};

HeaderSelectionComponent.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  header: HeaderSelector(state),
});

const ConnectedContainer = connect(
  mapStateToProps,
)(HeaderSelectionComponent);

export default ConnectedContainer;
