import PropTypes from 'prop-types';
import React from 'react';

import PanelSection from '../../__section/panel__section';
import Reset from '../panel__settings-reset';

const SegCircleSettings = ({
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
      Section
    </PanelSection>
    <PanelSection>
      <Reset resetSettings={resetSettings} />
    </PanelSection>
  </div>
);

SegCircleSettings.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
  settings: PropTypes.shape({}).isRequired,
  storeSettings: PropTypes.shape({}).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default SegCircleSettings;
