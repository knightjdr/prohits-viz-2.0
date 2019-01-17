import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Known from '../../__circheatmap/svg/known/known-container';
import Circle from '../../__circheatmap/svg/circle/circle-container';

const Svg = ({
  pieDimensions,
  plot,
  circHeatmapSettings,
  settings,
}) => {
  const radius = Math.ceil(pieDimensions.wrapper / 2);
  return (
    <Fragment>
      <svg
        id="svg-main"
        height={pieDimensions.wrapper}
        viewBox={`-${radius} -${radius} ${pieDimensions.wrapper} ${pieDimensions.wrapper}`}
        width={pieDimensions.wrapper}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="rotate(-90)">
          <Known
            radius={radius}
            readouts={plot.readouts}
          />
          <Circle
            plot={plot}
            radius={radius}
            settings={circHeatmapSettings}
            thickness={settings.thickness}
          />
        </g>
      </svg>
    </Fragment>
  );
};

Svg.propTypes = {
  pieDimensions: PropTypes.shape({
    wrapper: PropTypes.number,
  }).isRequired,
  plot: PropTypes.shape({
    readouts: PropTypes.arrayOf(
      PropTypes.shape({
        known: PropTypes.bool,
        readout: PropTypes.string,
      }),
    ),
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.number),
      }),
    ),
  }).isRequired,
  circHeatmapSettings: PropTypes.arrayOf(
    PropTypes.shape({
      abundanceCap: PropTypes.number,
      color: PropTypes.string,
      minAbundance: PropTypes.number,
    }),
  ).isRequired,
  settings: PropTypes.shape({
    thickness: PropTypes.number,
  }).isRequired,
};

const renderSvg = props => <Svg {...props} />;

export default renderSvg;
