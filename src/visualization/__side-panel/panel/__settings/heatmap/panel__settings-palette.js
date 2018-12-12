import PropTypes from 'prop-types';
import React from 'react';

import Menu from '../field/field-menu';
import Switch from '../field/field-switch';

const Palette = ({
  changeSetting,
  settings,
  storeSettings,
  updateSetting,
}) => (
  <div className="panel__settings-section panel__settings-section_width-right">
    <Menu
      field="edgeColor"
      name="Edge color"
      onChange={changeSetting}
      onClick={updateSetting}
      options={[
        {
          optGroup: 'mono',
          options: [
            { text: 'blue-black', value: 'blueBlack' },
            { text: 'green-black', value: 'greenBlack' },
            { text: 'red-black', value: 'redBlack' },
            { text: 'yellow-black', value: 'yellowBlack' },
            { text: 'greyscale', value: 'greyscale' },
          ],
        },
        {
          optGroup: 'dual',
          options: [
            { text: 'blue-yellow', value: 'blueYellow' },
            { text: 'blue-red', value: 'blueRed' },
          ],
        },
      ]}
      store={storeSettings.edgeColor}
      value={settings.edgeColor}
    />
    <Menu
      field="fillColor"
      name="Fill color"
      onChange={changeSetting}
      onClick={updateSetting}
      options={[
        {
          optGroup: 'mono',
          options: [
            { text: 'blue-black', value: 'blueBlack' },
            { text: 'green-black', value: 'greenBlack' },
            { text: 'red-black', value: 'redBlack' },
            { text: 'yellow-black', value: 'yellowBlack' },
            { text: 'greyscale', value: 'greyscale' },
          ],
        },
        {
          optGroup: 'dual',
          options: [
            { text: 'blue-yellow', value: 'blueYellow' },
            { text: 'blue-red', value: 'blueRed' },
          ],
        },
      ]}
      store={storeSettings.fillColor}
      value={settings.fillColor}
    />
    <Switch
      checked={settings.invertColor}
      field="invertColor"
      name="Invert color"
      onChange={changeSetting}
      onClick={updateSetting}
      store={storeSettings.invertColor}
    />
  </div>
);

Palette.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    edgeColor: PropTypes.string,
    fillColor: PropTypes.string,
    invertColor: PropTypes.bool,
  }).isRequired,
  storeSettings: PropTypes.shape({
    edgeColor: PropTypes.string,
    fillColor: PropTypes.string,
    invertColor: PropTypes.bool,
  }).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Palette;
