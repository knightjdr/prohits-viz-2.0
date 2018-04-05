import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import CustomField from '../field/field';
import SelectChange from '../field/select-change';

import './header-selection.css';

const HeaderSelection = ({
  columns,
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
          label="Bait column"
          name="bait"
          onChange={SelectChange}
          options={columns.bait.options}
          placeHolder="Bait column..."
          required
          style={{
            gridColumn: 1,
            gridRow: 1,
          }}
          type="select"
        />
        <CustomField
          label="Prey column"
          name="prey"
          onChange={SelectChange}
          options={columns.prey.options}
          placeHolder="Prey column..."
          required
          style={{
            gridColumn: 2,
            gridRow: 1,
          }}
          type="select"
        />
        <CustomField
          label="Abundance column"
          name="abundance"
          onChange={SelectChange}
          options={columns.abundance.options}
          placeHolder="Abundance column..."
          required
          style={{
            gridColumn: 1,
            gridRow: 2,
          }}
          type="select"
        />
        <CustomField
          label="Score column"
          name="score"
          onChange={SelectChange}
          options={columns.score.options}
          placeHolder="Score column..."
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

HeaderSelection.defaultProps = {
  columns: {},
};

HeaderSelection.propTypes = {
  columns: PropTypes.shape({
    abundance: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    bait: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    prey: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    score: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

export default HeaderSelection;
