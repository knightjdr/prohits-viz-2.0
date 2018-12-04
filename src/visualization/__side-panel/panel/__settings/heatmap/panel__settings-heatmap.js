import PropTypes from 'prop-types';
import React from 'react';

import Basic from './panel__settings-basic';
import Filters from './panel__settings-filter';
import Palette from './panel__settings-palette';
import PanelSection from '../../__section/panel__section';
import Reset from '../panel__settings-reset';

const HeatmapSettings = ({
  changeSetting,
  settings,
  resetSettings,
  storeSettings,
  updateSetting,
}) => (
  <div className="panel">
    <PanelSection
      border={false}
      title="Basic settings"
    >
      <Basic
        changeSetting={changeSetting}
        settings={settings}
        storeSettings={storeSettings}
        updateSetting={updateSetting}
      />
    </PanelSection>
    <PanelSection title="Colour palette">
      <Palette
        changeSetting={changeSetting}
        settings={settings}
        storeSettings={storeSettings}
        updateSetting={updateSetting}
      />
    </PanelSection>
    <PanelSection title="Filters">
      <Filters
        changeSetting={changeSetting}
        settings={settings}
        storeSettings={storeSettings}
        updateSetting={updateSetting}
      />
    </PanelSection>
    <PanelSection>
      <Reset resetSettings={resetSettings} />
    </PanelSection>
  </div>
);

HeatmapSettings.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({}).isRequired,
  storeSettings: PropTypes.shape({}).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default HeatmapSettings;
