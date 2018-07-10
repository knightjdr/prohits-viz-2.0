import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { InputNumber } from 'antd';
import { faSync } from '@fortawesome/pro-regular-svg-icons';

import './panel__settings.css';

const Filter = ({
  changeSetting,
  settings,
  updateSetting,
}) => ([
  <div key="abundance-cap-label">
    Abundance cap
  </div>,
  <div key="abundance-cap-input">
    <InputNumber
      onChange={(value) => { changeSetting('abundanceCap', value); }}
      value={settings.abundanceCap}
    />
    <button
      className="panel__settings-button"
      onClick={() => { updateSetting('abundanceCap'); }}
      type="button"
    >
      <FontAwesomeIcon icon={faSync} />
    </button>
  </div>,
  <div key="min-abundance-label">
    Abundance minimum
  </div>,
  <div key="min-abundance-input">
    <InputNumber
      onChange={(value) => { changeSetting('minAbundance', value); }}
      value={settings.minAbundance}
    />
    <button
      className="panel__settings-button"
      onClick={() => { updateSetting('minAbundance'); }}
      type="button"
    >
      <FontAwesomeIcon icon={faSync} />
    </button>
  </div>,
  <div key="primaryFilter-filter-label">
    Primary filter
  </div>,
  <div key="primaryFilter-filter-input">
    <InputNumber
      onChange={(value) => { changeSetting('primaryFilter', value); }}
      step="0.01"
      value={settings.primaryFilter}
    />
    <button
      className="panel__settings-button"
      onClick={() => { updateSetting('primaryFilter'); }}
      type="button"
    >
      <FontAwesomeIcon icon={faSync} />
    </button>
  </div>,
  <div key="secondaryFilter-filter-label">
    Secondary filter
  </div>,
  <div key="secondaryFilter-filter-input">
    <InputNumber
      onChange={(value) => { changeSetting('secondaryFilter', value); }}
      step="0.01"
      value={settings.secondaryFilter}
    />
    <button
      className="panel__settings-button"
      onClick={() => { updateSetting('secondaryFilter'); }}
      type="button"
    >
      <FontAwesomeIcon icon={faSync} />
    </button>
  </div>,
]);

Filter.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  settings: PropTypes.shape({}).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Filter;
