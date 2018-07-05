import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { InputNumber } from 'antd';
import { faArrowAltCircleRight } from '@fortawesome/pro-light-svg-icons';

import './panel__settings.css';

const Filter = ({
  filters,
}) => ([
  <div key="abundance-cap-label">
    Abundance cap
  </div>,
  <div key="abundance-cap-input">
    <InputNumber
      value={filters.abundanceCap}
    />
    <button
      className="panel__settings-button"
      type="button"
    >
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    </button>
  </div>,
  <div key="min-abundance-label">
    Abundance minimum
  </div>,
  <div key="min-abundance-input">
    <InputNumber
      value={filters.minAbundance}
    />
    <button
      className="panel__settings-button"
      type="button"
    >
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    </button>
  </div>,
  <div key="primary-filter-label">
    Primary filter
  </div>,
  <div key="primary-filter-input">
    <InputNumber
      step="0.01"
      value={filters.primary}
    />
    <button
      className="panel__settings-button"
      type="button"
    >
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    </button>
  </div>,
  <div key="secondary-filter-label">
    Secondary filter
  </div>,
  <div key="secondary-filter-input">
    <InputNumber
      step="0.01"
      value={filters.secondary}
    />
    <button
      className="panel__settings-button"
      type="button"
    >
      <FontAwesomeIcon icon={faArrowAltCircleRight} />
    </button>
  </div>,
]);

Filter.propTypes = {
  filters: PropTypes.shape({}).isRequired,
};

export default Filter;
