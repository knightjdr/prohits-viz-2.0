import PropTypes from 'prop-types';
import React from 'react';

import Input from '../field/field-input';
import Menu from '../field/field-menu';

export const roundInput = value => Math.round(value);

const Basic = ({
  changeSetting,
  settings,
  storeSettings,
  updateSetting,
}) => (
  <div className="panel__settings-section">
    <Menu
      field="imageType"
      name="Image type"
      onChange={changeSetting}
      onClick={updateSetting}
      options={[
        { text: 'dot plot', value: 'dotplot' },
        { text: 'heat map', value: 'heatmap' },
      ]}
      store={storeSettings.imageType}
      value={settings.imageType}
    />
    <Input
      field="cellSize"
      min={1}
      name="Cell size"
      onChange={changeSetting}
      onClick={updateSetting}
      parser={roundInput}
      step={1}
      store={storeSettings.cellSize}
      value={settings.cellSize}
    />
  </div>
);

Basic.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    cellSize: PropTypes.number,
    imageType: PropTypes.string,
  }).isRequired,
  storeSettings: PropTypes.shape({
    cellSize: PropTypes.number,
    imageType: PropTypes.string,
  }).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Basic;
