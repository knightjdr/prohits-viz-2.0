import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Known from '../../__segcircle/svg/known/known-container';
import Circle from '../../__segcircle/svg/circle/circle-container';

const Svg = ({
  circles,
  pieDimensions,
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
            readouts={circles.readouts}
          />
          <Circle
            circles={circles}
            radius={radius}
            thickness={settings.thickness}
          />
        </g>
      </svg>
    </Fragment>
  );
};

Svg.propTypes = {
  circles: PropTypes.shape({
    readouts: PropTypes.arrayOf(
      PropTypes.shape({
        known: PropTypes.bool,
        readout: PropTypes.string,
      }),
    ),
    order: PropTypes.arrayOf(PropTypes.number),
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.number),
      }),
    ),
  }).isRequired,
  pieDimensions: PropTypes.shape({
    wrapper: PropTypes.number,
  }).isRequired,
  settings: PropTypes.shape({
    thickness: PropTypes.number,
  }).isRequired,
};

const renderSvg = props => <Svg {...props} />;

export default renderSvg;
