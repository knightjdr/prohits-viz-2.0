import PropTypes from 'prop-types';
import React from 'react';

import PanelSection from '../../__section/panel__section';
import Plots from './panel__settings-plots';
import Reset from '../panel__settings-reset';

const SegCircleSettings = ({
  changePlot,
  changeSetting,
  plots,
  resetSettings,
  settings,
  storeSettings,
  updateSetting,
}) => (
  <div className="panel">
    <PanelSection
      border={false}
      title="Plot"
    >
      <Plots
        changePlot={changePlot}
        changeSetting={changeSetting}
        plots={plots}
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

SegCircleSettings.propTypes = {
  changePlot: PropTypes.func.isRequired,
  changeSetting: PropTypes.func.isRequired,
  plots: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  resetSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({}).isRequired,
  storeSettings: PropTypes.shape({}).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default SegCircleSettings;
