import PropTypes from 'prop-types';
import React from 'react';

import Input from '../field/field-input';

const Filter = ({
  changeSetting,
  settings,
  storeSettings,
  updateSetting,
}) => (
  <div className="panel__settings-section">
    <Input
      field="abundanceCap"
      name="Abundance cap"
      onChange={changeSetting}
      onClick={updateSetting}
      store={storeSettings.abundanceCap}
      value={settings.abundanceCap}
    />
    <Input
      field="minAbundance"
      name="Abundance minimum"
      onChange={changeSetting}
      onClick={updateSetting}
      store={storeSettings.minAbundance}
      value={settings.minAbundance}
    />
    <Input
      field="primaryFilter"
      name="Primary filter"
      onChange={changeSetting}
      onClick={updateSetting}
      step={0.01}
      store={storeSettings.primaryFilter}
      value={settings.primaryFilter}
    />
    <Input
      field="secondaryFilter"
      name="Secondary filter"
      onChange={changeSetting}
      onClick={updateSetting}
      step={0.01}
      store={storeSettings.secondaryFilter}
      value={settings.secondaryFilter}
    />
  </div>
);

Filter.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    abundanceCap: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    minAbundance: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    primaryFilter: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    secondaryFilter: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
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
