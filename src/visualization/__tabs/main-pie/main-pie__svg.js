import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Pie from '../../__pie/svg/plot/pie-svg__plot-container';
import Segment from '../../__pie/svg/plot/segment-svg__plot-container';

const Svg = ({
  pieDimensions,
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
          <Segment
            radius={radius}
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
};

const renderSvg = props => <Svg {...props} />;

export default renderSvg;
