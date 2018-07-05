import PropTypes from 'prop-types';
import React from 'react';

import Basic from './panel__settings-basic';
import Filters from './panel__settings-filter';
import Palette from './panel__settings-palette';

import './panel__settings.css';

const Settings = ({
  basic,
  filters,
  palette,
}) => (
  <div className="panel">
    <div className="panel__title">
      Basic settings
    </div>
    <div className="panel__settings-basic">
      <Basic
        basic={basic}
      />
    </div>
    <div className="panel__border" />
    <div className="panel__title">
      Colour palette
    </div>
    <div className="panel__settings-palette">
      <Palette
        palette={palette}
      />
    </div>
    <div className="panel__border" />
    <div className="panel__title">
      Filters
    </div>
    <div className="panel__settings-filter">
      <Filters
        filters={filters}
      />
    </div>
  </div>
);

Settings.propTypes = {
  basic: PropTypes.shape({}).isRequired,
  filters: PropTypes.shape({}).isRequired,
  palette: PropTypes.shape({}).isRequired,
};

export default Settings;
