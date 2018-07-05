import PropTypes from 'prop-types';
import React from 'react';

import Legend from './legend/legend';
import Settings from './panel__info-settings';

import './panel__info.css';

const Info = ({
  legend,
  params,
}) => (
  <div className="panel">
    <div className="panel__title">
      Analysis settings
    </div>
    <div className="panel__info-settings">
      {Settings(params)}
    </div>
    <div className="panel__border" />
    <div className="panel__title">
      Legend
    </div>
    <div className="panel__info-legend">
      {Legend(legend)}
    </div>
  </div>
);

Info.propTypes = {
  legend: PropTypes.shape({}).isRequired,
  params: PropTypes.shape({}).isRequired,
};

export default Info;
