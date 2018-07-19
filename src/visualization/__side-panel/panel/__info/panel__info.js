import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';

import Legend from './legend/legend';
import Name from './panel__info-name';
import Settings from './panel__info-settings';

import './panel__info.css';

const Info = ({
  downloadLegend,
  legend,
  loadNewFile,
  params,
}) => (
  <div className="panel">
    <Name
      loadNewFile={loadNewFile}
      name={params.name}
    />
    <div className="panel__border" />
    <div className="panel__title">
      Analysis settings
    </div>
    {Settings(params)}
    <div className="panel__border" />
    <div className="panel__title">
      Legend
    </div>
    <div className="panel__info-legend">
      {Legend(legend)}
    </div>
    <div className="panel__info-legend-save">
      <div>
        Download legend
      </div>
      <button
        className="panel__info-legend-save-button"
        onClick={downloadLegend}
        type="button"
      >
        <FontAwesomeIcon icon={faDownload} />
      </button>
    </div>
  </div>
);

Info.propTypes = {
  downloadLegend: PropTypes.func.isRequired,
  legend: PropTypes.shape({}).isRequired,
  loadNewFile: PropTypes.func.isRequired,
  params: PropTypes.shape({}).isRequired,
};

export default Info;
