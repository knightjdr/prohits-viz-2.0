import PropTypes from 'prop-types';
import React from 'react';
import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import CustomField from '../field/field';
import DefaultChange from '../field/default-change';
import ScrollTop from '../../../helpers/scroll-top';

import './header-selection.css';

const HeaderSelection = ({
  columns,
}) => {
  const headerElement = (
    <div className="form__header-selection">
      <Divider>Columns</Divider>
      <div>
        Specify the columns to use if they have not been preselected. See{' '}
        <NavLink
          className="form__header-selection-link"
          onClick={ScrollTop}
          to="/help/format"
        >
          here
        </NavLink>{' '}
        to learn about how the columns are used during analysis.
      </div>
      <div className="form__header-selection-select">
        <CustomField
          label="Condition column"
          name="condition"
          onChange={DefaultChange}
          options={columns.condition.options}
          placeHolder="Condition column..."
          required
          style={{
            gridColumn: 1,
            gridRow: 1,
          }}
          type="select"
        />
        <CustomField
          label="Readout column"
          name="readout"
          onChange={DefaultChange}
          options={columns.readout.options}
          placeHolder="Readout column..."
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
          onChange={DefaultChange}
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
          onChange={DefaultChange}
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
    condition: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    readout: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    score: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

export default HeaderSelection;
