import PropTypes from 'prop-types';
import React from 'react';

import Menu from '../field/field-menu';

export const roundInput = value => Math.round(value);

const Plots = ({
  changePlot,
  changeSetting,
  plots,
  settings,
  storeSettings,
  updateSetting,
}) => {
  const handleClick = (setting) => {
    updateSetting(setting);
    changePlot(plots[settings.plot]);
  };
  const options = plots.map((plot, index) => ({
    text: plot.name,
    value: index,
  }));
  return (
    <div className="panel__settings-section panel__settings-section_width-right">
      <Menu
        field="plot"
        name="Selected plot"
        onChange={changeSetting}
        onClick={handleClick}
        options={options}
        store={storeSettings.plot}
        value={settings.plot}
      />
    </div>
  );
};

Plots.propTypes = {
  changePlot: PropTypes.func.isRequired,
  changeSetting: PropTypes.func.isRequired,
  plots: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  settings: PropTypes.shape({
    plot: PropTypes.number,
  }).isRequired,
  storeSettings: PropTypes.shape({}).isRequired,
  updateSetting: PropTypes.func.isRequired,
};

export default Plots;
