import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { InputNumber } from 'antd';
import { faSync } from '@fortawesome/pro-regular-svg-icons';

import './panel__settings.css';

const Filter = ({
  changeSetting,
  settings,
  storeSettings,
  updateSetting,
}) => (
  <div className="panel__settings-filter">
    <div>
      Abundance cap
    </div>
    <div>
      <InputNumber
        onChange={(value) => { changeSetting('abundanceCap', value); }}
        value={settings.abundanceCap}
      />
      <button
        className={
          storeSettings.abundanceCap === settings.abundanceCap ?
          'panel__settings-button_theme-sync'
          :
          'panel__settings-button_theme-notsync'
        }
        onClick={() => { updateSetting('abundanceCap'); }}
        type="button"
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
    <div>
      Abundance minimum
    </div>
    <div>
      <InputNumber
        onChange={(value) => { changeSetting('minAbundance', value); }}
        value={settings.minAbundance}
      />
      <button
        className={
          storeSettings.minAbundance === settings.minAbundance ?
          'panel__settings-button_theme-sync'
          :
          'panel__settings-button_theme-notsync'
        }
        onClick={() => { updateSetting('minAbundance'); }}
        type="button"
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
    <div>
      Primary filter
    </div>
    <div>
      <InputNumber
        onChange={(value) => { changeSetting('primaryFilter', value); }}
        step="0.01"
        value={settings.primaryFilter}
      />
      <button
        className={
          storeSettings.primaryFilter === settings.primaryFilter ?
          'panel__settings-button_theme-sync'
          :
          'panel__settings-button_theme-notsync'
        }
        onClick={() => { updateSetting('primaryFilter'); }}
        type="button"
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
    <div>
      Secondary filter
    </div>
    <div>
      <InputNumber
        onChange={(value) => { changeSetting('secondaryFilter', value); }}
        step="0.01"
        value={settings.secondaryFilter}
      />
      <button
        className={
          storeSettings.secondaryFilter === settings.secondaryFilter ?
          'panel__settings-button_theme-sync'
          :
          'panel__settings-button_theme-notsync'
        }
        onClick={() => { updateSetting('secondaryFilter'); }}
        type="button"
      >
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
  </div>
);

Filter.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    abundanceCap: PropTypes.number,
    minAbundance: PropTypes.number,
    primaryFilter: PropTypes.number,
    secondaryFilter: PropTypes.number,
  }).isRequired,
  storeSettings: PropTypes.shape({
    abundanceCap: PropTypes.number,
    minAbundance: PropTypes.number,
    primaryFilter: PropTypes.number,
    secondaryFilter: PropTypes.number,
  }).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Filter;
