import PropTypes from 'prop-types';
import React from 'react';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';

import Legend from './legend/legend';
import Name from './panel__info-name';
import RoundButton from '../../../../components/round-button/round-button';
import Section from '../__section/panel__section';
import Settings from './settings/settings';

import './panel__info.css';

const Info = ({
  downloadLegend,
  loadNewFile,
  params,
  circHeatmapSettings,
  segments,
  settings,
}) => (
  <div className="panel">
    <Name
      loadNewFile={loadNewFile}
      name={params.name}
    />
    <Section title="Analysis settings">
      {Settings(params)}
    </Section>
    <Section title="Legend">
      <div className="panel__info-legend">
        {Legend({ ...params, ...settings }, circHeatmapSettings, segments)}
      </div>
    </Section>
    <div className="panel__info-legend-save">
      <div>
        Download legend
      </div>
      <RoundButton
        className="panel__info-legend-save-button"
        onClick={downloadLegend}
        icon={faDownload}
        size="1x"
      />
    </div>
  </div>
);

Info.defaultProps = {
  segments: [],
};

Info.propTypes = {
  downloadLegend: PropTypes.func.isRequired,
  loadNewFile: PropTypes.func.isRequired,
  params: PropTypes.shape({}).isRequired,
  circHeatmapSettings: PropTypes.arrayOf(
    PropTypes.shape({
      abundanceCap: PropTypes.number,
      color: PropTypes.string,
      minAbundance: PropTypes.number,
    }),
  ).isRequired,
  segments: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  settings: PropTypes.shape({}).isRequired,
};

export default Info;
