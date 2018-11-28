import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Known from '../../__pie/svg/known/known-container';
import Pie from '../../__pie/svg/enrichment/enrichment-container';
import Segment from '../../__pie/svg/segment/segment-container';

const Svg = ({
  pieDimensions,
  segments,
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
            segments={segments}
          />
          <Segment
            abundanceCap={50}
            radius={radius}
            segmentColor="blueBlack"
            segments={segments}
            sort
          />
          <Pie
            radius={radius}
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
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      abundance: PropTypes.number,
      known: PropTypes.bool,
      readout: PropTypes.string,
    }),
  ).isRequired,
};

const renderSvg = props => <Svg {...props} />;

export default renderSvg;
